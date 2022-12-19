import { connectionDB } from "../database/db.js";

export default async function urlShortenController(req, res) {
    try {
        const { user_id, url, short_url, visited} = req.shortled;

        await connectionDB.query(`INSERT INTO urls(user_id, url, short_url, visited) VALUES($1, $2, $3, $4)`, [user_id, url, short_url, visited]);

        res.status(201).send({shortUrl: short_url});
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}