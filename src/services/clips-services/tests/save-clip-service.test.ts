import { describe, it, expect, vi, beforeEach } from "vitest";
import { ClipRepositoryInMemory } from "../../../repositories/in-memory/clip-repository-in-memory";
import { SaveClipService } from "../save-clip-service";
import { GetClipByIdInTwitchApiClient } from "../../../http/api-client-http";
import { mockClips, mockClipsResponse } from "../../streamer-services/mocks/mock-clips";
import { GetClipByIdInTwitchApiClientError } from "../../../http/errors/get-clips-by-id-in-twitch-api-client-error.ts";

describe("Save Clip Service Test (Unit)", () => {
	let clipRepositoryInMemory: ClipRepositoryInMemory;
	let saveClipService: SaveClipService;

	beforeEach(() => {
		clipRepositoryInMemory = new ClipRepositoryInMemory();
		saveClipService = new SaveClipService(clipRepositoryInMemory);
	});

	it("should save the clip returned by GetClipByIdInTwitchApiClient", async () => {
		vi.mock("../../../http/api-client-http", () => ({
			GetClipByIdInTwitchApiClient: vi.fn().mockResolvedValue({
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
			}),
		}));

		const tokenTwitch = "mocked_token";
		const clipId = mockClips[0].id;

		await saveClipService.execute({ clipId, tokenTwitch });

		const savedClips = await clipRepositoryInMemory.getClipsSaves();
		expect(savedClips).toHaveLength(1);
		expect(savedClips[0]).toEqual(mockClipsResponse[0]);
	});

	it("should throw an error if GetClipByIdInTwitchApiClient fails", async () => {
		vi.mocked(GetClipByIdInTwitchApiClient).mockRejectedValue(
			new GetClipByIdInTwitchApiClientError()
		);

		const tokenTwitch = "mocked_token";
		const clipId = "111";

		await expect(
			saveClipService.execute({ clipId, tokenTwitch })
		).rejects.toThrowError(GetClipByIdInTwitchApiClientError);
	});
});
