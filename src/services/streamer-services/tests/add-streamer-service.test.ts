import { expect, describe, it, beforeEach, vi } from "vitest";
import { StreamerRepositoryInMemory } from "../../../repositories/in-memory/streamer-repository-in-memory";
import { AddStreamerService } from "../add-streamer-service";
import { StreamerAlreadyAddedError } from "../errors/streamer-already-added-error";
import { GetStreamerInTwitchApiClient } from "../../../http/api-client-http";
import { GetStreamerInTwitchApiClientError } from "../../../http/errors/get-streamer-in-twitch-api-client-error";
import { mockStreamer } from "../mocks/mock-streamer";

vi.mock("../../../http/api-client-http");

describe("Add Streamer Service", () => {
	let streamerRepositoryInMemory: StreamerRepositoryInMemory;
	let addStreamerService: AddStreamerService;

	beforeEach(() => {
		streamerRepositoryInMemory = new StreamerRepositoryInMemory();
		addStreamerService = new AddStreamerService(streamerRepositoryInMemory);

		vi.mocked(GetStreamerInTwitchApiClient).mockResolvedValue({
			streamerData: mockStreamer,
			pagination: "",
		});
	});

	it("should add streamer in database", async () => {
		expect(
			await addStreamerService.execute({
				name: "mockName",
				category: "mockCategory",
				tokenTwitch: "mockTokenTwitch",
			})
		).toEqual(undefined);
	});

	it("should throw an error if GetStreamerInTwitchApiClient fails", async () => {
		vi.mocked(GetStreamerInTwitchApiClient).mockRejectedValueOnce(
			new GetStreamerInTwitchApiClientError()
		);

		await expect(
			addStreamerService.execute({
				name: "mockName",
				category: "mockCategory",
				tokenTwitch: "mockTokenTwitch",
			})
		).rejects.toThrowError(GetStreamerInTwitchApiClientError);
	});

	it("should throw an error if streamer already exists", async () => {
		await streamerRepositoryInMemory.addStreamer(mockStreamer);

		await expect(
			addStreamerService.execute({
				name: "mockName",
				category: "mockCategory",
				tokenTwitch: "mockTokenTwitch",
			})
		).rejects.toThrowError(StreamerAlreadyAddedError);
	});
});
