import express from "express";
import { streamerRouter } from "./routes/streamer-router";

export const app = express();

app.use(express.json());


app.use("/v1", streamerRouter);