import { Clip } from "@prisma/client";
import { ClipRepositoryInterface } from "../interfaces/clip-repository-interface";

export class ClipRepositoryInMemory implements ClipRepositoryInterface{
	public itens: Clip[] = [];

	async getClipsSaves(){
		return this.itens;
	}
	async saveClip(clip: Clip){
		const newClip = {
			...clip,
			streamer_name: clip.broadcaster_name.toLowerCase()
		};

		this.itens.push(newClip);
	}
	async removeClip(clipId: string){
		const clipFound = this.itens.findIndex((item) => item.id === clipId);
		this.itens.slice(clipFound, 1);
	}

	async findClipById(clipId: string){
		const clipFound = this.itens.find((item) => item.id === clipId);
		return Promise.resolve(clipFound ?? null);
	}
    
}