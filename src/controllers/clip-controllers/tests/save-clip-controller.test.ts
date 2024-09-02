import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Save Clip Controller Test (E2E)", () => {
	it("should save the clip in database", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "michel", category: "cs2" });

		const response = await request(app).post(
			"/v1/clip/save-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR"
		);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Clipe salvo com sucesso!");
		expect(response.body.success).toBe(true);
	});

	it("should throw an error if not found clip in twitch", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "michel", category: "cs2" });

		const response = await request(app).post(
			"/v1/clip/save-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWRR"
		);

		expect(response.body.success).toBe(false);
	});
});
