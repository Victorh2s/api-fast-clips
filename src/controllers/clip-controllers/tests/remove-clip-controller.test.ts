import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Remove Clip Controller Test (E2E)", () => {
	it("should remove the clip in database", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "michel", category: "cs2" });

		await request(app).post(
			"/v1/clip/save-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR"
		);

		const response = await request(app).delete(
			"/v1/clip/remove-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR"
		);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe(
			"Clipes removido do banco de dados com sucesso!"
		);
		expect(response.body.success).toBe(true);
	});

	it("should throw an error if not found clip in database", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "michel", category: "cs2" });

		const response = await request(app).delete(
			"/v1/clip/remove-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR"
		);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Esse clip não foi encontrado no sistema!"
		);
		expect(response.body.success).toBe(false);
	});
});
