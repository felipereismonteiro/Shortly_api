import { connectionDB } from "../database/db.js";

export default async function deleteShortUrlController(req, res) {
    try {
        const { token, id } = req.deleteOne;
        await connectionDB.query(`DELETE FROM urls WHERE id=$1`, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}