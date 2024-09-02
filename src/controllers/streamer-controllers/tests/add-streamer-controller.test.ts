import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Add Streamer Controller Test (E2E)", () => {
	it("should add a streamer in Database", async () => {
		const response = await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "lucas_montano", category: "Just Chating" });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Streamer adicionado com sucesso!");
		expect(response.body.success).toBe(true);
	});

	it("should throw an error if GetStreamerInTwitchApiClient fails", async () => {
		const response = await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "", category: "" });

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Requisição para pegar as informações de um streamer especifico falhou!"
		);
		expect(response.body.success).toBe(false);
	});

	it("should throw an error if streamer already exists", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "lucas_montano", category: "Just Chating" });

		const response = await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "lucas_montano", category: "Just Chating" });

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Esse Streamer já foi adicionado no banco de dados!"
		);
		expect(response.body.success).toBe(false);
	});
});
