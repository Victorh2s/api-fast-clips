import { expect, describe, it, beforeEach, vi } from "vitest";
import { GetClipsService } from "../get-clips-service";
import { StreamerRepositoryInMemory } from "../../../repositories/in-memory/streamer-repository-in-memory";
import { Streamer } from "@prisma/client";
import moment from "moment";
import { GetClipsInTwitchApiClient } from "../../../http/api-client-http";

vi.mock("../../../http/api-client-http");

describe("Get Clips Service", () => {
	let streamerRepositoryInMemory: StreamerRepositoryInMemory;
	let getClipsService: GetClipsService;

	beforeEach(() => {
		streamerRepositoryInMemory = new StreamerRepositoryInMemory();
		getClipsService = new GetClipsService(streamerRepositoryInMemory);
		vi.mocked(GetClipsInTwitchApiClient).mockResolvedValue([
			{
				id: "SeductiveBlueLorisArsonNoSexy-bSX7O_fUUzXudW3u",
				url: "https://clips.twitch.tv/SeductiveBlueLorisArsonNoSexy-bSX7O_fUUzXudW3u",
				embed_url:
          "https://clips.twitch.tv/embed?clip=SeductiveBlueLorisArsonNoSexy-bSX7O_fUUzXudW3u",
				broadcaster_id: "517877705",
				broadcaster_name: "gaulestv",
				creator_id: "71649056",
				creator_name: "dynamitwOw",
				video_id: "",
				game_id: "32399",
				language: "pt-br",
				title: "Fofuria",
				view_count: 47,
				created_at: "2024-08-12T13:21:11Z",
				thumbnail_url:
          "https://clips-media-assets2.twitch.tv/7xKGXG0l-zv31FM17nVt7g/AT-cm%7C7xKGXG0l-zv31FM17nVt7g-preview-480x272.jpg",
				duration: 51.7,
				vod_offset: null,
				is_featured: false,
				streamer_name: "gaulestv",
			},
			{
				id: "TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR",
				url: "https://clips.twitch.tv/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR",
				embed_url:
          "https://clips.twitch.tv/embed?clip=TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR",
				broadcaster_id: "75891532",
				broadcaster_name: "Michel",
				creator_id: "145214149",
				creator_name: "jota_drk",
				video_id: "2223210872",
				game_id: "32399",
				language: "pt-br",
				title: "Pode dedo do coach ? ",
				view_count: 393,
				created_at: "2024-08-13T14:00:25Z",
				thumbnail_url:
          "https://clips-media-assets2.twitch.tv/0c-Aw9114d-3kZEMQjFlEQ/AT-cm%7C0c-Aw9114d-3kZEMQjFlEQ-preview-480x272.jpg",
				duration: 12.4,
				vod_offset: 1259,
				is_featured: false,
				streamer_name: "michel",
			},
		]);
	});

	it("should fetch clips for streamers Test (Unit)", async () => {
		const streamers: Streamer[] = [
			{
				id: "517877705",
				login: "gaulestv",
				display_name: "gaulestv",
				type: "Cs2",
				broadcaster_type: "partner",
				description:
          "Do Lock and Load ao Pentakill. De CS:GO a LOL. De transmissões exclusivas a análises detalhadas de cada partida. A GaulesTV é feita pela tribo para a tribo: um novo canal com muito mais conteúdo, campeonatos para todos, novos gauleses e o mesmo espírito que nos trouxe até aqui.",
				profile_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/124660fa-4f98-4759-9ec5-131eabbb8528-profile_image-300x300.png",
				offline_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/1fb89682-beed-4596-a7f3-6f52e670f1d7-channel_offline_image-1920x1080.png",
				view_count: 0,
				created_at: moment("2024-08-27T23:36:32.158Z").toDate(),
			},
			{
				id: "75891532",
				login: "michel",
				display_name: "Michel",
				type: "Cs2",
				broadcaster_type: "partner",
				description:
          "Fiz parte de equipes como mibr, g3x, oNe, KEYD, Red Reserve, GamerHouse, playArt e muitas outras. Atualmente transmitindo o conteudo lider em Counter-Strike & VALORANT. Propagando ideias e o AGGLIFESTYLE.",
				profile_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/50d70d17-7221-4d2d-a3f6-0c59a9d42a0f-profile_image-300x300.png",
				offline_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/814be884-1f27-494c-b3a2-e0c48f88b091-channel_offline_image-1920x1080.png",
				view_count: 0,
				created_at: moment("2024-08-27T23:37:37.460Z").toDate(),
			},
		];

		const promise = streamers.map((streamer) => {
			return streamerRepositoryInMemory.addStreamer(streamer);
		});

		Promise.all(promise);

		const result = await getClipsService.execute({
			amount: "1",
			startedAt: "2024-08-12",
			tokenTwitch: "mockToken",
		});

		expect(result).toEqual([
			{
				streamer_id: "517877705",
				streamer_name: "gaulestv",
				clips: expect.any(Array),
			},
			{
				streamer_id: "75891532",
				streamer_name: "michel",
				clips: expect.any(Array),
			},
		]);
	});

	it("should return nothing in response", async () => {
		expect(
			await getClipsService.execute({
				amount: "",
				startedAt: "",
				tokenTwitch: "",
			})
		).toEqual([]);
	});
});
