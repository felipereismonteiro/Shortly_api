import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { deleteShortUrlRoute } from "./routes/deleteShortUrlRoute.js";
import { getRankingRoute } from "./routes/getRankingRoute.js";
import { getUrlShortenRoute } from "./routes/getUrlShortenRoute.js";
import { getUsersMeRoute } from "./routes/getUsersMeRoute.js";
import { openShortUrl } from "./routes/openShortUrlRoute.js";
import { postUrlShortenRoute } from "./routes/postUrlShortenRoute.js";
import { signInRoute } from "./routes/signInRoute.js";
import { signUpRoute } from "./routes/signUpRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(signUpRoute);
app.use(signInRoute);
app.use(postUrlShortenRoute);
app.use(getUrlShortenRoute);
app.use(openShortUrl);
app.use(deleteShortUrlRoute);
app.use(getUsersMeRoute);
app.use(getRankingRoute);

// server running
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Running on port: ${port}`));
