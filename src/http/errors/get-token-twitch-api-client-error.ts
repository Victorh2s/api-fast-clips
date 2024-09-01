export class GetTokenTwitchApiClientError extends Error {
	constructor(){
		super("Requisição para pegar token da twitch falhou!");
	}
}