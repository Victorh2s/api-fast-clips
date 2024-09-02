import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";
import { Streamer } from "@prisma/client";

describe("Get Streamer Controller Test (E2E)", () => {
	it("should get many streamers saved in Database", async () => {
		await request(app)
			.post("/v1/streamer/add-streamer")
			.send({ name: "lucas_montano", category: "Just Chating" });

		const response = await request(app).get("/v1/streamer/view-streamers");

		const streamer = response.body.streamers[0] as Streamer;

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Streamers encontrados com sucesso!");
		expect(response.body.success).toBe(true);
		expect(response.body.streamers).toBeInstanceOf(Array);
		expect(response.body.streamers.length).toBeGreaterThan(0);
		expect(streamer.login).toEqual("lucas_montano");
	});
});
