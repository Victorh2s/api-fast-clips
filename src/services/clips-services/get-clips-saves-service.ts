import { ClipRepositoryInterface } from "../../repositories/interfaces/clip-repository-interface";

export class GetClipsSavesService{
	constructor(
        private ClipRepositoryDatabase: ClipRepositoryInterface
	) {}

	async execute(){
		return await this.ClipRepositoryDatabase.getClipsSaves();
	}
}