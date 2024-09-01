import { Response } from "express";

export function DonwloadClipHandleErrors(response: Response, error: unknown) {
	const errorMap: { [key: string ]: number} = {
		VideoNotFoundError: 400,
		VideoUploadError: 400
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

export class VideoUploadError extends Error {
	constructor() {
		super("Erro ao tentar enviar vídeo como resposta");
	}
}