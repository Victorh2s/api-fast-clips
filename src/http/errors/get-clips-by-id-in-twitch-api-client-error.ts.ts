export class GetClipByIdInTwitchApiClientError extends Error {
	constructor() {
		super("Requisição para pegar um clipe especifico falhou!");
	}
}