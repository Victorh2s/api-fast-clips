import puppeteer from "puppeteer";
import { VideoNotFoundError } from "../services/clips-services/errors/video-not-found-error";

export async function GetClipSrcAndTitleUtil(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url);

	const result = await page.evaluate(() => {
		const video = document.querySelector("video");
		const titleElement = document.querySelector("h2[data-a-target=\"stream-title\"");

		const clipSrc = video ? video.src : null;
		const clipTitle = titleElement ? titleElement.textContent : null;

		if(!clipSrc) {
			throw new VideoNotFoundError();
		}

		return { clipSrc, clipTitle };
	});

	await browser.close();
	return result;
}