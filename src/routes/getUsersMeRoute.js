import { Router } from "express";
import getUsersMeController from "../controllers/getUsersMeController.js";
import getUsersMeMiddleware from "../middlewares/getUsersMeMiddleware.js";
export const getUsersMeRoute = Router();

getUsersMeRoute.get("/users/me", getUsersMeMiddleware, getUsersMeController);