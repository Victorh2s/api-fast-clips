import { ClipRepositoryInterface } from "../../repositories/interfaces/clip-repository-interface";
import { ClipNotFoundInSystemError } from "./errors/clip-not-found-in-system-error";


interface RemoveClipServiceInterface {
    clipId: string;
}   


export class RemoveClipService{
	constructor(
        private ClipRepositoryDatabase: ClipRepositoryInterface
	) {}

	async execute({clipId }: RemoveClipServiceInterface){
		const clipFound = await this.ClipRepositoryDatabase.findClipById(clipId);

		if(!clipFound) throw new ClipNotFoundInSystemError();

		await this.ClipRepositoryDatabase.removeClip(clipId);
	}
}