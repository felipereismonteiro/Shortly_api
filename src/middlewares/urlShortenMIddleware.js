import { urlShortenSchema } from "../models/urlShortenSchema.js";
import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";

export default async function urlShortenMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    const body = req.body;
    const token = header.replace("Bearer ", "");

    if (header === undefined || header.split(" ")[0] !== "Bearer") {
      return res.sendStatus(401);
    }

    const { url } = await urlShortenSchema.validateAsync(body, {
      abortEarly: false,
    });

    const user = await connectionDB.query(
      `SELECT * FROM tokens WHERE token=$1`,
      [token]
    );

    const urlFounded = await connectionDB.query(`SELECT * FROM urls WHERE user_id=$1 AND url=$2`, [user.rows[0].id_user, url])

    if (urlFounded.rows.length !== 0) {
      return res.status(401).send("Url already in use!!!");
    }

    const shortledUrl = {
      user_id: user.rows[0].id_user,
      url,
      short_url: nanoid(6),
      visited: 0,
    };

    req.shortled = shortledUrl;
    next();
  } catch (err) {
    console.log(err);
    res.send(err.details.map((d) => d.message));
  }
}
