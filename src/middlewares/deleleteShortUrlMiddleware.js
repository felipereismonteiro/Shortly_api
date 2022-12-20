import { connectionDB } from "../database/db.js"

export default async function deleteShortUrlMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        
        if(authorization === undefined || authorization.split(" ")[0] !== "Bearer") {
            return res.sendStatus(401);
        }

        const token = authorization.replace("Bearer ","")
        const { id } = req.params;

        const url = await connectionDB.query(`SELECT * FROM urls WHERE id=$1`, [id]);

        if(url.rows.length === 0) {
            return res.sendStatus(404);
        }

        const user = await connectionDB.query(`
        SELECT tokens.id_user, urls.user_id 
        FROM tokens, urls 
        WHERE tokens.token=$1 AND urls.id=$2`, [token, id]);


        if (user.rows[0].id_user !== user.rows[0].user_id) {
            return res.sendStatus(401);
        }
 
        req.deleteOne = {token, id}
        next();
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}