import { Request, Response } from "express";
import {  DonwloadClipHandleErrors, VideoUploadError } from "./errors/download-clip-handle-errors";
import { DownloadClipService } from "../../services/clips-services/download-clip-service";

export async function DownloadClipController (request: Request, response: Response) {

	const { clip_id: clipId } = request.params;

	try {
		const downloadClipService = new DownloadClipService();

		const { filePath, clipTitle } = await downloadClipService.execute({
			clipId
		});

		const safeFileName = clipTitle ? clipTitle.replace(/[<>:"/\\|?*]+/g, "_") + ".mp4" : "video.mp4";

		return response.download(filePath, safeFileName, (err) => {
			if(err) {
				throw new VideoUploadError();
			}
		});
        
	} catch (error) {
		DonwloadClipHandleErrors(response, error);
	}
}