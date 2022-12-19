import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { signUpRoute } from "./routes/signUpRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(signUpRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Running on port: ${port}`));
