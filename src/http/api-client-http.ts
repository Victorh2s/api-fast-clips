import { Clip } from "@prisma/client";
import { twitchAxios, twitchTokenAxios } from "./axios-config-http";
import { GetStreamerInTwitchApiClientError } from "./errors/get-streamer-in-twitch-api-client-error";
import { GetTokenTwitchApiClientError } from "./errors/get-token-twitch-api-client-error";
import { GetClipsInTwitchApiClientError } from "./errors/get-clips-in-twitch-api-client-error";
import { GetClipByIdInTwitchApiClientError } from "./errors/get-clips-by-id-in-twitch-api-client-error.ts";

export async function GetTokenTwitchApiClient(){
	try {
		const payload = {
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			grant_type: process.env.GRANT_TYPE
		};

		const response = await twitchTokenAxios.post("", payload);

		const data = await response.data;

		return data;
	} catch {
		throw new GetTokenTwitchApiClientError();
	}
}

export async function GetStreamerInTwitchApiClient(name: string, tokenTwitch: string) {
	try {
		const response = await twitchAxios.get(`users?login=${name}`, {
			headers: {
				"Client-ID": process.env.CLIENT_ID,
				Authorization: `Bearer ${tokenTwitch}`
			}
		});

		const streamerInfo = {
			streamerData: await response.data.data[0],
			pagination: await response.data.pagination
		};

		return streamerInfo;

	} catch {
		throw new GetStreamerInTwitchApiClientError();
	}
}

export async function GetClipsInTwitchApiClient(
	streamerId: string,
	formattedDate: string,
	amount: string,
	tokenTwitch: string
): Promise<Clip[]> {
	try {
		const response = await twitchAxios.get(
			`clips?broadcaster_id=${streamerId}&started_at=${formattedDate}&first=${amount}`,
			{
				headers: {
					"Client-ID": process.env.CLIENT_ID,
					Authorization: `Bearer ${tokenTwitch}`,
				},
			}
		);
  
		return await response.data.data;
	} catch {
		throw new GetClipsInTwitchApiClientError();
	}
}

export async function  GetClipByIdInTwitchApiClient(clipId: string, tokenTwitch: string): Promise<Clip> {
	try {
		const response = await twitchAxios.get(`clips/?id=${clipId}`,  {
			headers: {
				"Client-ID": process.env.CLIENT_ID,
				Authorization: `Bearer ${tokenTwitch}`
			},
		});
		return await response.data.data[0];
	}catch {
		throw new GetClipByIdInTwitchApiClientError();
	}
}