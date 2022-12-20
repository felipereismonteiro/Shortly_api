import { Router } from "express";
import deleteShortUrlController from "../controllers/deleteShortUrlController.js";
import deleteShortUrlMiddleware from "../middlewares/deleleteShortUrlMiddleware.js";
export const deleteShortUrlRoute = Router();

deleteShortUrlRoute.delete("/urls/:id", deleteShortUrlMiddleware, deleteShortUrlController);