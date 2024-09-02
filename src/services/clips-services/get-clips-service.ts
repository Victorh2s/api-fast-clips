import moment from "moment";
import { StreamerRepositoryInterface } from "../../repositories/interfaces/streamer-repository-interface";
import { GetClipsInTwitchApiClient } from "../../http/api-client-http";
import { Clip } from "@prisma/client";

interface GetClipsServiceInterface {
  amount: string;
  startedAt: string;
  tokenTwitch: string;
}

interface ClipInterface {
  streamer_id: string;
  streamer_name: string;
  clips: Clip[];
}

export class GetClipsService {
	constructor(
    private StreamerRepositoryDatabase: StreamerRepositoryInterface
	) {}

	async execute({ amount, startedAt, tokenTwitch }: GetClipsServiceInterface) {
		const streamers = await this.StreamerRepositoryDatabase.findManyStreamer();

		const clips: ClipInterface[] = [];

		const formattedDate = moment(startedAt, "YYYY-MM-DD").toISOString();

		const promises = streamers.map(async (streamer) => {
			const clipsStreamer = await GetClipsInTwitchApiClient(
				streamer.id,
				formattedDate,
				amount,
				tokenTwitch
			);

			clips.push({
				streamer_id: streamer.id,
				streamer_name: streamer.login,
				clips: clipsStreamer,
			});
		});

		await Promise.all(promises);

		return clips;
	}
}
