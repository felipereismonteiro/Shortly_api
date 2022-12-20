import { connectionDB } from "../database/db.js"

export default async function getRankingController(req, res) {
    try {
        const ranking = await connectionDB.query(`
        SELECT users.id, users.name, COUNT(urls) AS "linksCount", SUM(urls.visited) AS "visitCount"
        FROM urls 
        JOIN users
        ON urls.user_id = users.id
        GROUP BY users.id, urls.visited 
        ORDER BY urls.visited DESC;
        `);
        res.send(ranking.rows);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}