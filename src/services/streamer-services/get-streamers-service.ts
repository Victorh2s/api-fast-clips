import { StreamerRepositoryInterface } from "../../repositories/interfaces/streamer-repository-interface";



export class GetStreamersService{
	constructor(
        private StreamerRepositoryDatabase: StreamerRepositoryInterface
	) {}

	async execute(){
		return await this.StreamerRepositoryDatabase.findManyStreamer();
	}
}