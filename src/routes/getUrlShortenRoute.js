import { Router } from "express";
import getUrlShortenController from "../controllers/getUrlShortenController.js";

export const getUrlShortenRoute = Router();

getUrlShortenRoute.get("/urls/:id", getUrlShortenController);
