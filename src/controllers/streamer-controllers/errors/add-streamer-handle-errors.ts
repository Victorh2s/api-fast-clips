import { Response } from "express";

export function AddStreamerHandleErrors(response: Response, error: unknown) {
	const errorMap: { [key: string ]: number} = {
		GetStreamerInTwitchApiClientError: 400,
		StreamerAlreadyAddedError: 400
	};

	if(error instanceof Error){
		const status = errorMap[error?.constructor?.name] || 500;
		const message = error instanceof Error ? error.message : "Erro desconhecido.";
        
		response.status(status).json({
			message,
			success: false
		});
	} 
}