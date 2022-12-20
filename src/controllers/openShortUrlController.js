import { connectionDB } from "../database/db.js"

export default async function openShortUrlController(req, res) {
    try {
        const { shortUrl } = req.params;
        const promisse = await connectionDB.query(`SELECT * FROM urls WHERE short_url=$1`, [shortUrl]);
        console.log(promisse);
        if (promisse.rows.length === 0) {
            return res.sendStatus(404);
        }

        let { visited } = promisse.rows[0];

        await connectionDB.query(`UPDATE urls SET visited=$1 WHERE short_url=$2`, [visited += 1, shortUrl])
        res.redirect(promisse.rows[0].url);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}