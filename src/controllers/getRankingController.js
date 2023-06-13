import { prisma } from "../database/db.js";

export default async function getRankingController(req, res) {
  try {
    const ranking = await prisma.$queryRaw`
      SELECT users.id, users.name, COUNT(urls) AS "linksCount", SUM(urls.visited) AS "visitCount"
      FROM urls
      JOIN users ON urls.user_id = users.id
      GROUP BY users.id, users.name
      ORDER BY SUM(urls.visited) DESC;
    `;

    const serializedRanking = ranking.map(user => ({
      id: user.id,
      name: user.name,
      linksCount: Number(user.linksCount),
      visitCount: Number(user.visitCount),
    }));

    res.json(serializedRanking);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}
