import { GetClipByIdInTwitchApiClient } from "../../http/api-client-http";
import { ClipRepositoryInterface } from "../../repositories/interfaces/clip-repository-interface";


interface SaveClipServiceInterface {
    clipId: string;
    tokenTwitch: string;
}   


export class SaveClipService{
	constructor(
        private ClipRepositoryDatabase: ClipRepositoryInterface
	) {}

	async execute({clipId, tokenTwitch}: SaveClipServiceInterface){
		const clip = await GetClipByIdInTwitchApiClient(clipId, tokenTwitch);

		await this.ClipRepositoryDatabase.saveClip(clip);
	}
}