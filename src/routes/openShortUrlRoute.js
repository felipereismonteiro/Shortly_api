import { Router } from "express";
import openShortUrlController from "../controllers/openShortUrlController.js";

export const openShortUrl = Router();

openShortUrl.get("/urls/open/:shortUrl", openShortUrlController);
