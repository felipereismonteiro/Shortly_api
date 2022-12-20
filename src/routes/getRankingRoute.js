import { Router } from "express";
import getRankingController from "../controllers/getRankingController.js";
export const getRankingRoute = Router();

getRankingRoute.get("/ranking", getRankingController)