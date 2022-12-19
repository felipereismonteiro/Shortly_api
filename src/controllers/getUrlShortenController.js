import { connectionDB } from "../database/db.js";

export default async function getUrlShortenController(req, res) {
    try {
        const { id } = req.params;
        const idUrl = await connectionDB.query(`SELECT * FROM urls WHERE id=$1`, [id]);

        if (idUrl.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.send(idUrl.rows);
    } catch(err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}