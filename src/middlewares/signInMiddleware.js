import { prisma } from "../database/db.js" 
import { signInSchema } from "../models/signInSchema.js"
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid"

export default async function signInMiddleware(req, res, next) {
    try {
        const body = req.body;

        const { email, password } = await signInSchema.validateAsync(body, {abortEarly: false});
        
        const foundedEmail = await prisma.users.findFirst({
            where: {
                email
            }
        })
        
        if (!foundedEmail) return res.sendStatus(404);

        const compared = bcrypt.compareSync(password, foundedEmail.password);

        if (compared === false) return res.sendStatus(401);
    
       
        const token = {
            id_user: foundedEmail.id,
            token: uuid()
        }
        
        req.token = token;
        next();
    } catch(err) {
        console.log(err);
        res.status(422).send(err.details.map(d => d.message));
    }
}