import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { signUpRoute } from "./routes/signUpRoute.js";
import { signInRoute } from "./routes/signInRoute.js";
import { postUrlShortenRoute } from "./routes/postUrlShortenRoute.js";
import { getUrlShortenRoute } from "./routes/getUrlShortenRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(signUpRoute);
app.use(signInRoute);
app.use(postUrlShortenRoute);
app.use(getUrlShortenRoute)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Running on port: ${port}`));
