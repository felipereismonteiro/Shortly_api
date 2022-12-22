import { connectionDB } from "../database/db.js";

export default async function signInController(req, res) {
  try {
    const { id_user, token } = req.token;
    await connectionDB.query(`INSERT INTO tokens(id_user, token) VALUES($1, $2)`, [id_user, token]);
    const user = await connectionDB.query(`SELECT users.name WHERE id=$1`, [id_user]) 
    res.send(token, user.rows).status(200);
  } catch (err) {
    res.send(err.message);
  }
}
