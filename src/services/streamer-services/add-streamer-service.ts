import { GetStreamerInTwitchApiClient } from "../../http/api-client-http";
import { StreamerRepositoryInterface } from "../../repositories/interfaces/streamer-repository-interface";
import { StreamerAlreadyAddedError } from "./errors/streamer-already-added-error";

interface AddStreamerServiceInterface {
    name: string;
    category: string;
    tokenTwitch: string;
}

export class AddStreamerService{
	constructor(
        private StreamerRepositoryDatabase: StreamerRepositoryInterface
	) {}

	async execute({name, category, tokenTwitch}: AddStreamerServiceInterface){

		const { streamerData } =  await GetStreamerInTwitchApiClient(name.toLowerCase(), tokenTwitch);

		const streamerFound = await this.StreamerRepositoryDatabase.findUnique(
			streamerData.id
		);

		if(streamerFound) {
			throw new StreamerAlreadyAddedError();
		}

		const data = {
			...streamerData,
			type: category,
			created_at: new Date()
		};

		return await this.StreamerRepositoryDatabase.addStreamer(data);
	}
}