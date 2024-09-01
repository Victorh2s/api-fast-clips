import { NextFunction, Request, Response } from "express";
import { GetTokenTwitchApiClient } from "../http/api-client-http";

export async function TwitchTokenMiddleware(request: Request, response: Response, next: NextFunction) {
	try {
		const tokenAzure = await GetTokenTwitchApiClient();
		request.token = tokenAzure.access_token;
		return next();
	} catch (error: unknown) {
		if(error instanceof Error) {
			return response.status(404).json({
				message: error.message
			});
		} else {
			return response.status(500).json({
				message: "Erro no servidor!"
			});
		}
	}
}