import { connectionDB } from "../database/db.js" 
import { signInSchema } from "../models/signInSchema.js"
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid"

export default async function signInMiddleware(req, res, next) {
    try {
        const body = req.body;

        const { email, password } = await signInSchema.validateAsync(body, {abortEarly: false});

        const foundedEmail = await connectionDB.query(`SELECT * FROM users WHERE email=$1`, [email]);
        
        if (foundedEmail.rows.length === 0) {
            return res.sendStatus(404);
        }
        
        const compared = bcrypt.compareSync(password, foundedEmail.rows[0].password); 

        if (compared === false) {
            return res.sendStatus(401);
        }

        const token = {
            id_user: foundedEmail.rows[0].id,
            token: uuid()
        }

        console.log(token)
        
        req.token = token;
        next();
    } catch(err) {
        console.log(err.message);
        res.status(422).send(err.details.map(d => d.message));
    }
}