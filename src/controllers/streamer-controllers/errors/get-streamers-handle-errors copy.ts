import { Response } from "express";

export function GetStreamersHandleErrors(response: Response, error: unknown) {
	const errorMap: { [key: string ]: number} = {
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