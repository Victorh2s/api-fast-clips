import { PrismaClient, Streamer } from "@prisma/client";
import { StreamerRepositoryInterface } from "../interfaces/streamer-repository-interface";


const prisma = new PrismaClient();


export class StreamerRepositoryDatabase implements StreamerRepositoryInterface {
	async findUnique(id: string) {
		return await prisma.streamer.findUnique({
			where:{
				id
			}
		});
	}

	async findByUsername(username: string) {
		return await prisma.streamer.findUnique({
			where:{
				login: username
			}
		});
	}

	async addStreamer(data: Streamer){
		await prisma.streamer.create({data});
	}

	async removeStreamer(username: string) {
		await prisma.streamer.delete({
			where:{
				login: username
			}
		});
	}

	async findManyStreamer(){
		return await prisma.streamer.findMany();
	}
}