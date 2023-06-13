import { postUrlShortenSchema } from "../models/postUrlShortenSchema.js";
import { nanoid } from "nanoid";
import { prisma } from "../database/db.js";

export default async function postUrlShortenMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    const body = req.body;
    

    if (header === undefined || header.split(" ")[0] !== "Bearer") {
      return res.sendStatus(401);
    }
    const token = header.replace("Bearer ", "");

    const { url } = await postUrlShortenSchema.validateAsync(body, {
      abortEarly: false,
    });

    const user = await prisma.tokens.findFirst({
      where: {
        token
      }
    })

    const urlFounded = await prisma.urls.findFirst({
      where: {
        user_id: user.id_user,
        url
      }
    })

    if (urlFounded) {
      return res.status(401).send("Url already in use!!!");
    }

    const shortledUrl = {
      user_id: user.id_user,
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
