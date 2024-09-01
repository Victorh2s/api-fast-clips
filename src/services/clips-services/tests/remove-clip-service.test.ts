import { expect, describe, it, beforeEach } from "vitest";
import { ClipRepositoryInMemory } from "../../../repositories/in-memory/clip-repository-in-memory";
import { RemoveClipService } from "../remove-clip-service";
import { ClipNotFoundInSystemError } from "../errors/clip-not-found-in-system-error";
import { mockClips, mockClipsResponse } from "../../streamer-services/mocks/mock-clips";

describe("Remove Clip Service Test (Unit)", () => {
	let clipRepositoryInMemory: ClipRepositoryInMemory;
	let removeClipService: RemoveClipService;

	beforeEach(() => {
		clipRepositoryInMemory = new ClipRepositoryInMemory();
		removeClipService = new RemoveClipService(clipRepositoryInMemory);
	});

	it("should remove clip for database", async () => {
		const promise = mockClipsResponse.map((clip) => {
			return clipRepositoryInMemory.saveClip(clip);
		});

		Promise.all(promise);

		await removeClipService.execute({ clipId: mockClips[0].id });

		const clips = await clipRepositoryInMemory.getClipsSaves();

		expect(clips).toEqual([mockClipsResponse[1]]);
	});

	it("should throw an error if findClipById return nothing", async () => {
		await expect(
			removeClipService.execute({ clipId: mockClips[0].id })
		).rejects.toThrowError(ClipNotFoundInSystemError);
	});
});
