import { Request, Response } from "express";
import { StreamerRepositoryDatabase } from "../../repositories/database/streamer-repository-database";
import moment from "moment";
import { GetClipsService } from "../../services/clips-services/get-clips-service";
import { GetClipsHandleErrors } from "./errors/get-clips-handle-errors";

export async function GetClipsController(request: Request, response: Response) {

	const { amount, startedAt } = request.query;
	const tokenTwitch = request.token;

	const querys = {
		amount: amount ? amount.toString() : "5",
		startedAt: startedAt ? startedAt.toString() : moment().subtract(1, "days").format("YYYY-MM-DD"),
		tokenTwitch
	};
    
	try {

		const streamerRepositoryDatabase = new StreamerRepositoryDatabase();  
		const getClipsService = new GetClipsService(streamerRepositoryDatabase);

		await getClipsService.execute(querys);

		return response.json({
			message: "Clipes encontrados com sucesso!",
			success: true
		}).status(200);
	} catch (error) {
		GetClipsHandleErrors(response, error);
	}
}