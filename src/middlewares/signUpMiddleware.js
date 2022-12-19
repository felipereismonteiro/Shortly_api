import { signUpSchema } from "../models/signUpSchema.js";
import { connectionDB } from "../database/db.js";
import { hashSync } from "bcrypt";

export default async function signUpMiddleware(req, res, next) {
  try {
    const body = req.body;
    const validate = await signUpSchema.validateAsync(body, {
      abortEarly: false,
    });

    const users = await connectionDB.query(
      `SELECT * FROM users WHERE email=$1`,
      [body.email]
    );

    if (users.rows.length !== 0 || (body.password !== body.confirmPassword)) {
      return res.sendStatus(409);
    }
    
    const sync = hashSync(validate.password, 10);

    req.user = {...validate, password: sync};
    next();
  } catch (err) {
    console.log(err);
    res.status(422).send(err.details.map((d) => d.message));
  }
}
