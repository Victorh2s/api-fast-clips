import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("Download Clips Controller Test (E2E)", () => {
	it("should download the clip as a file", async () => {
		const response = await request(app).get(
			"/v1/clip/download-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWUR"
		);

		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toBe("video/mp4");
		expect(response.header["content-disposition"]).toContain(
			"attachment; filename="
		);
		expect(response.header["content-disposition"]).toMatch(
			/filename=".*\.mp4"/
		);
	});

	it("should throw an error if not found clip in twitch", async () => {
		const response = await request(app).get(
			"/v1/clip/download-clip/TolerantSwissBaboonFailFish-3XXh37eRkQxCMWU"
		);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Não foi possível baixar o vídeo!");
		expect(response.body.success).toBe(false);
	});
});
