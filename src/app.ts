import express from "express";
import * as dotenv from "dotenv";
import { streamerRouter } from "./routes/streamer-router";
import { clipRouter } from "./routes/clip-router";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

dotenv.config();
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const app = express();

app.use(express.json());


app.use("/v1", streamerRouter);
app.use("/v1", clipRouter);
