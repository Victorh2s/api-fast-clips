import { PrismaClient, Clip } from "@prisma/client";
import { ClipRepositoryInterface } from "../interfaces/clip-repository-interface";


const prisma = new PrismaClient();


export class ClipRepositoryDatabase implements ClipRepositoryInterface {
	async getClipsSaves(){
		return await prisma.clip.findMany();
	}

	async saveClip(clip: Clip) {
		await prisma.clip.create({
			data:{
				...clip,
				streamer_name: clip.broadcaster_name.toLowerCase()
			}
		});
	}

	async removeClip(clipId: string) {
		await prisma.clip.delete({
			where:{
				id: clipId
			}
		});
	}

	async findClipById(clipId: string) {
		return await prisma.clip.findUnique({
			where:{
				id: clipId
			}
		});
	}
}