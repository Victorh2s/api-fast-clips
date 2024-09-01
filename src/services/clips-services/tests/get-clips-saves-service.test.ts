import { describe, it, expect, beforeEach } from "vitest";
import { GetClipsSavesService } from "../get-clips-saves-service";

import { ClipRepositoryInMemory } from "../../../repositories/in-memory/clip-repository-in-memory";
import { mockClipsResponse } from "../../streamer-services/mocks/mock-clips";

describe("Get Clips Saves Service Test (Unit)", () => {
	let clipRepositoryInMemory: ClipRepositoryInMemory;
	let getClipsSavesService: GetClipsSavesService;

	beforeEach(() => {
		clipRepositoryInMemory = new ClipRepositoryInMemory();
		getClipsSavesService = new GetClipsSavesService(clipRepositoryInMemory);
	});

	it("should return saved clips", async () => {
		const promise = mockClipsResponse.map((clip) => {
			return clipRepositoryInMemory.saveClip(clip);
		});

		Promise.all(promise);

		const clipsSaved = await getClipsSavesService.execute();

		expect(clipsSaved).toEqual(mockClipsResponse);
	});

	it("should return nothing", async () => {
		expect(await getClipsSavesService.execute()).toEqual([]);
	});

});
