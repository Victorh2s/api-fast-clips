import { Router } from "express";
import { AddStreamerController } from "../controllers/streamer-controllers/add-streamer-controller";
import { TwitchTokenMiddleware } from "../middlewares/twitch-token-middleware";
import { GetStreamersController } from "../controllers/streamer-controllers/get-streamers-controller";

export const streamerRouter = Router();

streamerRouter.post("/streamer/add-streamer", TwitchTokenMiddleware, AddStreamerController);
streamerRouter.get("/streamer/view-streamers", GetStreamersController);