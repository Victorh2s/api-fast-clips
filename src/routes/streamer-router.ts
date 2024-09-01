import { Router } from "express";
import { AddStreamerController } from "../controllers/streamer-controllers/add-streamer-controller";
import { TwitchTokenMiddleware } from "../middlewares/twitch-token-middleware";

export const streamerRouter = Router();

streamerRouter.post("/streamer/add-streamer", TwitchTokenMiddleware, AddStreamerController);