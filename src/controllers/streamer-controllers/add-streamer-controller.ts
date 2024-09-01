import { Request, Response } from "express";
import { StreamerRepositoryDatabase } from "../../repositories/database/streamer-repository-database";
import { AddStreamerService } from "../../services/streamer-services/add-streamer-service";
import { AddStreamerHandleErrors } from "./errors/add-streamer-handle-errors";

export async function AddStreamerController(request: Request, response: Response) {

	const { name, category } = request.body;
	const tokenTwitch = request.token;
	try {
		const streamerRepositoryDatabase = new StreamerRepositoryDatabase();  
		const addStreamerController = new AddStreamerService(streamerRepositoryDatabase);

		await addStreamerController.execute({ name, category, tokenTwitch });

		return response.json({
			message: "Streamer adicionado com sucesso!",
			success: true
		}).status(200);
	} catch (error) {
		AddStreamerHandleErrors(response, error);
	}
}