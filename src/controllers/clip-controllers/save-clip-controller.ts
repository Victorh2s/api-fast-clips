import { Request, Response } from "express";
import { ClipRepositoryDatabase } from "../../repositories/database/clip-repository-database";
import { SaveClipService } from "../../services/clips-services/save-clip-service";
import { SaveClipHandleErrors } from "./errors/save-clip-handle-errors";

export async function SaveClipController(request: Request, response: Response) {
	const { clip_id: clipId } = request.params;
	const tokenTwitch = request.token;
	try {
		const clipRepositoryDatabase = new ClipRepositoryDatabase();  
		const saveClipService = new SaveClipService(clipRepositoryDatabase);

		await saveClipService.execute({ clipId, tokenTwitch });

		return response.json({
			message: "Clipe salvo com sucesso!",
			success: true
		}).status(200);
	} catch (error) {
		SaveClipHandleErrors(response, error);
	}
}