import { expect, describe, it, beforeEach, vi } from "vitest";
import { StreamerRepositoryInMemory } from "../../../repositories/in-memory/streamer-repository-in-memory";
import { RemoveStreamerService } from "../remove-streamer-service";
import { mockStreamer } from "../mocks/mock-streamer";
import { StreamerNotFoundInDatabase } from "../errors/streamer-not-found-in-database-error";

vi.mock("../../../http/api-client-http");

describe("Remove Streamer Service", () => {
	let streamerRepositoryInMemory: StreamerRepositoryInMemory;
	let removeStreamerService: RemoveStreamerService;

	beforeEach(() => {
		streamerRepositoryInMemory = new StreamerRepositoryInMemory();
		removeStreamerService = new RemoveStreamerService(
			streamerRepositoryInMemory
		);
	});

	it("should remove streamer by name of database", async () => {
		await streamerRepositoryInMemory.addStreamer(mockStreamer);

		await removeStreamerService.execute(mockStreamer.login);

		expect(await streamerRepositoryInMemory.findManyStreamer()).toEqual([]);
	});

	it("should throw an error if RemoveStreamerService fails", async () => {
		await expect(
			removeStreamerService.execute(mockStreamer.login)
		).rejects.toThrow(StreamerNotFoundInDatabase);
	});
});
