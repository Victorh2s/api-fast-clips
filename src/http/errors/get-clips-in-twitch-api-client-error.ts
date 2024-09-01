export class GetClipsInTwitchApiClientError extends Error {
	constructor() {
		super("Requisição para pegar os clipes falhou!");
	}
}