import { prisma } from "../database/db.js";

export default async function getUsersMeMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (
      authorization === undefined ||
      authorization.split(" ")[0] !== "Bearer"
    ) {
      return res.sendStatus(401);
    }
    const token = authorization.replace("Bearer ", "");

    await prisma.tokens.findFirstOrThrow({
      where: {
        token,
      },
    });

    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}
