import { Router } from "express";
import postUrlShortenController from "../controllers/postUrlShortenController.js";
import postUrlShortenMiddleware from "../middlewares/postUrlShortenMIddleware.js";
export const postUrlShortenRoute = Router();

postUrlShortenRoute.post("/urls/shorten", postUrlShortenMiddleware, postUrlShortenController);