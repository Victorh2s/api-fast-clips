import path from "path";
import crypto from "crypto";
import fs from "fs";
import { GetClipSrcAndTitleUtil } from "../../utils/get-clip-src-and-title-util";
import ffmpeg from "fluent-ffmpeg";
import { VideoNotFoundError } from "./errors/video-not-found-error";


interface DownloadClipServiceInterface {
    clipId: string;
}

export class DownloadClipService{
	constructor() {}

	async execute({ clipId }: DownloadClipServiceInterface){

		const outputDir = path.join(__dirname, "../../upload");
		const outputFileName = path.join(outputDir, `${crypto.randomUUID()}.mp4`);

		if(!fs.existsSync(outputDir)){
			fs.mkdirSync(outputDir);
		}

		try {
			const { clipSrc, clipTitle } = await GetClipSrcAndTitleUtil(`https://clips.twitch.tv/${clipId}`);

			await new Promise((resolve, reject) => {
				ffmpeg(clipSrc)
					.output(outputFileName)
					.videoCodec("libx264")
					.audioCodec("aac")
					.on("end", resolve)
					.on("error", reject)
					.run();
			});

			return {filePath: outputFileName, clipTitle};
		} catch  {
			throw new VideoNotFoundError();
		}
	}
}