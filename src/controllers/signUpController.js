import { prisma } from "../database/db.js";

export default async function signUpController(req, res) {
    try {
        const { name, email, password } = req.user;
        await prisma.users.create({
            data: {
                name,
                email,
                password,
            }
        })
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}