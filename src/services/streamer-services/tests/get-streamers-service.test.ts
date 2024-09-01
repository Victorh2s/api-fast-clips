import { expect, describe, it, beforeEach, vi } from "vitest";
import { StreamerRepositoryInMemory } from "../../../repositories/in-memory/streamer-repository-in-memory";
import { GetStreamersService } from "../get-streamers-service";
import { mockStreamer } from "../mocks/mock-streamer";

vi.mock("../../../http/api-client-http");

describe("Get Streamers Service", () => {
	let streamerRepositoryInMemory: StreamerRepositoryInMemory;
	let getStreamersService: GetStreamersService;

	beforeEach(() => {
		streamerRepositoryInMemory = new StreamerRepositoryInMemory();
		getStreamersService = new GetStreamersService(streamerRepositoryInMemory);
	});

	it("should return all streamers of database", async () => {
		await streamerRepositoryInMemory.addStreamer(mockStreamer);

		expect(await getStreamersService.execute()).toEqual([mockStreamer]);
	});
});
