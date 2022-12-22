import { connectionDB } from "../database/db.js";

export default async function signInController(req, res) {
  try {
    const { id_user, token } = req.token;
    await connectionDB.query(`INSERT INTO tokens(id_user, token) VALUES($1, $2)`, [id_user, token]);
    res.send(token).status(200);
  } catch (err) {
    res.send(err.message);
  }
}
