import { signUpSchema } from "../models/signUpSchema.js";
import { prisma } from "../database/db.js";
import { hashSync } from "bcrypt";

export default async function signUpMiddleware(req, res, next) {
  try {
    const body = req.body;
    const validate = await signUpSchema.validateAsync(body, {
      abortEarly: false,
    });

    const users = await prisma.users.findFirst({
      where: {
        email: body.email
      }
    })

    if (users || (body.password !== body.confirmPassword)) {
      return res.sendStatus(409);
    }
    
    const sync = hashSync(validate.password, 10);

    req.user = {...validate, password: sync};
    next();
  } catch (err) {
    console.log(err);
    res.status(422).send(err.details);
  }
}
