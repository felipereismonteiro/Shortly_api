import { prisma } from "../database/db.js";

export default async function(req, res) {
    try {
        const token = req.token;

        const promise = await prisma.$queryRaw`
        SELECT users.id, users.name, SUM(urls.visited) AS "visitCount",
        json_agg(urls.*) AS "shortenedUrls"
        FROM tokens
        JOIN users ON tokens.id_user = users.id
        JOIN urls ON tokens.id_user = urls.user_id
        WHERE tokens.token=${token}
        GROUP BY users.id
        `;

        const result = JSON.parse(JSON.stringify(promise));

        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}
