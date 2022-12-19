import { Router } from "express";
import urlShortenController from "../controllers/urlShortenController.js";
import urlShortenMiddleware from "../middlewares/urlShortenMIddleware.js";
export const urlShortenRoute = Router();

urlShortenRoute.post("/urls/shorten", urlShortenMiddleware, urlShortenController);