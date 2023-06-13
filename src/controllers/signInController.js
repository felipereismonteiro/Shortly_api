import { prisma } from "../database/db.js";

export default async function signInController(req, res) {
  try {
    const { id_user, token } = req.token;
    await prisma.tokens.create({
      data: {
        token,
        id_user
      }
    })
    const user = await prisma.users.findUnique({
      where: {
        id: id_user
      }
    })
    
    res.status(200).send({token, userName: user});
  } catch (err) {
    res.send(err.message);
  }
}
