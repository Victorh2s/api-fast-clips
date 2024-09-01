import { describe, it, expect, beforeEach, vi } from "vitest";
import { VideoNotFoundError } from "../errors/video-not-found-error";
import { DownloadClipService } from "../download-clip-service";

vi.mock("../../../utils/get-clip-src-and-title-util", () => ({
	GetClipSrcAndTitleUtil: vi.fn().mockResolvedValue({
		clipSrc: "http://example.com/clip.mp4",
		clipTitle: "Mock Clip Title",
	}),
}));

describe("Download Clips Service Test (Unit)", () => {
	let downloadClipsService: DownloadClipService;
	beforeEach(() => {
		downloadClipsService = new DownloadClipService();
	});

	it("should return filePath and clipsTitle ", async () => {
		const clipId = "mockClipId";

		await expect(downloadClipsService.execute({ clipId })).rejects.toThrowError(
			VideoNotFoundError
		);
	});
});
