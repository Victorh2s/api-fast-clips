import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Get Clips Saves Controller Test (E2E)", () => {
	it("should return the clips saved in the database", async () => {
		await request(app).post(
			"/v1/clip/save-clip/BeautifulNeighborlyWheelAsianGlow-MPeP2lato1aVgs0G"
		);

		const response = await request(app).get("/v1/clip/get-clips-saves");

		expect(response.status).toBe(200);
		expect(response.body.message).toBe(
			"Todos os clipes salvos no sistema foram encontrados com sucesso!"
		);
		expect(response.body.success).toBe(true);
		expect(response.body.clipes).toBeInstanceOf(Array);
	});
});
