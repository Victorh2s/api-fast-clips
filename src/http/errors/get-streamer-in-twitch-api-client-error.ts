export class GetStreamerInTwitchApiClientError extends Error {
	constructor() {
		super("Requisição para pegar as informações de um streamer especifico falhou!");
	}
}