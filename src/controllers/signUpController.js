import { connectionDB } from "../database/db.js";

export default async function signUpController(req, res) {
    try {
        const { name, email, password } = req.user;
        await connectionDB.query(`INSERT INTO users(name, email, password) VALUES($1, $2, $3)`, [name, email, password]);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}