import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Remove Streamer Controller Test (E2E)", () => {
	it("should remove streamer of Database", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "lucas_montano", category: "Just Chating" });

		const response = await request(app).delete(
			"/v1/streamer/remove-streamer/lucas_montano"
		);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Streamer removido com sucesso!");
		expect(response.body.success).toBe(true);
	});

	it("should throw an error if not found streamer by name in database", async () => {
		const response = await request(app).delete(
			"/v1/streamer/remove-streamer/lucas_montano"
		);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Esse Streamer não foi encontrado no sistema!"
		);
		expect(response.body.success).toBe(false);
	});
});
