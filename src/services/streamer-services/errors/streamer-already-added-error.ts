export class StreamerAlreadyAddedError extends Error {
	constructor() {
		super("Esse Streamer já foi adicionado no banco de dados!");
	}
}