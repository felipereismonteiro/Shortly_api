import { prisma } from "../database/db.js";

export default async function postUrlShortenController(req, res) {
  try {
    const { user_id, url, short_url, visited } = req.shortled;

    await prisma.query(
      `INSERT INTO urls(user_id, url, short_url, visited) VALUES($1, $2, $3, $4)`,
      [user_id, url, short_url, visited]
    );
    await prisma.urls.create({
      data: {
        user_id,
        short_url,
        url,
        visited,
      },
    });

    res.status(201).send({ shortUrl: short_url });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}
