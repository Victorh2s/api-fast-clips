export class VideoNotFoundError extends Error {
	constructor() {
		super("Não foi possível baixar o vídeo!");
	}
}