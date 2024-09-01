export class ClipNotFoundInSystemError extends Error {
	constructor() {
		super("Esse clip não foi encontrado no sistema!");
	}
}