import { Request, Response } from "express";
import { StreamerRepositoryDatabase } from "../../repositories/database/streamer-repository-database";
import { GetStreamersService } from "../../services/streamer-services/get-streamers-service";
import { GetStreamersHandleErrors } from "./errors/get-streamers-handle-errors";

export async function GetStreamersController(request: Request, response: Response) {

	try {
		const streamerRepositoryDatabase = new StreamerRepositoryDatabase();  
		const getStreamersService = new GetStreamersService(streamerRepositoryDatabase);

		const streamers =await getStreamersService.execute();

		return response.json({
			message: "Streamer encontrados com sucesso!",
			success: true,
			streamers
		}).status(200);
	} catch (error) {
		GetStreamersHandleErrors(response, error);
	}
}