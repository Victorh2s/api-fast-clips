import { Router } from "express";
import { TwitchTokenMiddleware } from "../middlewares/twitch-token-middleware";
import { GetClipsController } from "../controllers/clip-controllers/get-clips-controller";
import { GetClipsSavesController } from "../controllers/clip-controllers/get-clips-saves-controller";
import { SaveClipController } from "../controllers/clip-controllers/save-clip-controller";
import { RemoveClipController } from "../controllers/clip-controllers/remove-clip-controller";
import { DownloadClipController } from "../controllers/clip-controllers/download-clip-controller";


export const clipRouter = Router();

clipRouter.get("/clip/get-clips", TwitchTokenMiddleware, GetClipsController);
clipRouter.get("/clip/get-clips-saves", GetClipsSavesController);
clipRouter.post("/clip/save-clip/:clip_id", TwitchTokenMiddleware, SaveClipController);
clipRouter.delete("/clip/remove-clip/:clip_id", RemoveClipController);
clipRouter.get("/clip/download-clip/:clip_id", DownloadClipController);




