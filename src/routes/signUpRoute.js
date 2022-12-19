import { Router } from "express";
import signUpController from "../controllers/signUpController.js";
import signUpMiddleware from "../middlewares/signUpMiddleware.js";
export const signUpRoute = Router();

signUpRoute.post("/signup", signUpMiddleware, signUpController);
