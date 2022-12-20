import { connectionDB } from "../database/db.js";

export default async function(req, res) {
    try {
        const token = req.token;

        const promisse = await connectionDB.query(`
        SELECT users.id, users.name, SUM(urls.visited) AS "visitCount",      
        json_agg(urls.*) AS "shortenedUrls"
        FROM tokens 
        JOIN users ON tokens.id_user = users.id
        JOIN urls ON tokens.id_user = urls.user_id
        WHERE tokens.token=$1
        GROUP BY users.id
        `,[token]);

        res.send(promisse.rows[0]);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}