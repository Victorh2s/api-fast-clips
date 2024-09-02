import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Get Clips Controller Test (E2E)", () => {
	it("should receive a lot of twitch clips based on streamers saved", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "lucas_montano", category: "Just Chating" });

		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "gaules", category: "cs2" });

		const response = await request(app).get(
			"/v1/clip/get-clips?amount=10&startedAt=2024-08-12"
		);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Clipes encontrados com sucesso!");
		expect(response.body.success).toBe(true);
		expect(response.body.clipes).toBeInstanceOf(Array);
		expect(response.body.clipes.length).toBeGreaterThan(0);
	});

	it("should throw an error if not found streamer by name in database", async () => {
		const response = await request(app).get(
			"/v1/clip/get-clips?amount=a&startedAt=2024-08-12"
		);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Requisição para pegar os clipes falhou!"
		);
		expect(response.body.success).toBe(false);
	});
});
