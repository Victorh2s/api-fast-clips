import { StreamerRepositoryInterface } from "../../repositories/interfaces/streamer-repository-interface";
import { StreamerNotFoundInDatabase } from "./errors/streamer-not-found-in-database-error";

export class RemoveStreamerService{
	constructor(
        private StreamerRepositoryDatabase: StreamerRepositoryInterface
	) {}

	async execute(name: string){

		const streamerFound = await this.StreamerRepositoryDatabase.findByUsername(name);

		if(!streamerFound) {
			throw new StreamerNotFoundInDatabase();
		}

		await this.StreamerRepositoryDatabase.removeStreamer(name);
	}
}