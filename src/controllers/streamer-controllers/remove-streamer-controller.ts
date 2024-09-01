import { Request, Response } from "express";
import { StreamerRepositoryDatabase } from "../../repositories/database/streamer-repository-database";
import { RemoveStreamerHandleErrors } from "./errors/remove-streamer-handle-errors";
import { RemoveStreamerService } from "../../services/streamer-services/remove-streamer-service";

export async function RemoveStreamerController(request: Request, response: Response) {
	const { name } = request.params;
	try {
		const streamerRepositoryDatabase = new StreamerRepositoryDatabase();  
		const removeStreamerService = new RemoveStreamerService(streamerRepositoryDatabase);

		await removeStreamerService.execute(name);

		return response.json({
			message: "Streamer removido com sucesso!",
			success: true,
		}).status(200);
	} catch (error) {
		RemoveStreamerHandleErrors(response, error);
	}
}