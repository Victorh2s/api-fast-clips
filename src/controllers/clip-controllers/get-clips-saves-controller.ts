import { Request, Response } from "express";
import { ClipRepositoryDatabase } from "../../repositories/database/clip-repository-database";
import { GetClipsSavesService } from "../../services/clips-services/get-clips-saves-service";
import { GetClipsSavesHandleErrors } from "./errors/get-clips-saves-handle-errors";

export async function GetClipsSavesController (request: Request, response: Response) {

	try {
		const clipRepositoryDatabase = new ClipRepositoryDatabase();  
		const getClipsSavesService = new GetClipsSavesService(clipRepositoryDatabase);

		const clipes = await getClipsSavesService.execute();

		return response.json({
			message: "Todos os clipes salvos no sistema foram encontrados com sucesso!",
			success: true,
			clipes
		}).status(200);
	} catch (error) {
		GetClipsSavesHandleErrors(response, error);
	}
}