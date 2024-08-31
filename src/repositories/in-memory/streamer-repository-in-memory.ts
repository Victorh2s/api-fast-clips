import { Streamer } from "@prisma/client";
import { StreamerRepositoryInterface } from "../interfaces/streamer-repository-interface";

export class StreamerRepositoryInMemory implements StreamerRepositoryInterface{
	public itens: Streamer[] = [];

	async findUnique(id: string) {
		const streamerFound = this.itens.find((itens) => itens.id === id);
		return Promise.resolve(streamerFound ?? null);
	}
	async findByUsername(username: string) {
		const streamerFound = this.itens.find((itens) => itens.login === username);
		return Promise.resolve(streamerFound ?? null);
	}
	async addStreamer(data: Streamer) {
		this.itens.push(data);
	}
	async removeStreamer(username: string) {
		const streamerFound = this.itens.findIndex((itens) => itens.login === username);
		this.itens.splice(streamerFound, 1);
	}
	async findManyStreamer() {
		return this.itens;
	}
}