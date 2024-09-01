import { Request, Response } from "express";
import { ClipRepositoryDatabase } from "../../repositories/database/clip-repository-database";
import { RemoveClipHandleErrors } from "./errors/remove-clip-handle-errors";
import { RemoveClipService } from "../../services/clips-services/remove-clip-service";

export async function RemoveClipController(
	request: Request,
	response: Response
) {
	const { clip_id: clipId } = request.params;
	try {
		const clipRepositoryDatabase = new ClipRepositoryDatabase();
		const removeClipService = new RemoveClipService(
			clipRepositoryDatabase
		);

		await removeClipService.execute({clipId});

		return response
			.json({
				message: "Clipes removido do banco de dados com sucesso!",
				success: true,
			})
			.status(200);
	} catch (error: unknown) {
		RemoveClipHandleErrors(response, error);
	}
}
