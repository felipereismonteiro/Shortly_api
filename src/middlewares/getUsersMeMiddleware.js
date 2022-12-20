import { connectionDB } from "../database/db.js"

export default async function getUsersMeMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        if(authorization === undefined || authorization.split(" ")[0] !== "Bearer") {
            return res.sendStatus(401);
        }
        const token = authorization.replace("Bearer ", "");

        const userExists = await connectionDB.query(`SELECT FROM tokens WHERE token=$1`, [token]);

        if (userExists.rows.length === 0) {
            return res.sendStatus(404);
        }
        
        req.token = token;
        next();
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}