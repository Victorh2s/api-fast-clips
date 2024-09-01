export class StreamerNotFoundInDatabase extends Error {
	constructor() {
		super("Esse Streamer não foi encontrado no sistema!");
	}
}