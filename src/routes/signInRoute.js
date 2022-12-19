import { Router } from "express";
import signInController from "../controllers/signInController.js";
import signInMiddleware from "../middlewares/signInMiddleware.js";
export const signInRoute = Router();

signInRoute.post("/signin", signInMiddleware, signInController);