import { prisma } from "../database/db.js"

export default async function deleteShortUrlMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        
        if(authorization === undefined || authorization.split(" ")[0] !== "Bearer") {
            return res.sendStatus(401);
        }

        const token = authorization.replace("Bearer ","")
        const { id } = req.params;

        const url = await prisma.urls.findFirstOrThrow({
            where: {
                id
            }
        })

        const user = await prisma.$queryRaw(`
        SELECT tokens.id_user, urls.user_id
        FROM tokens, urls
        WHERE tokens.token=$1 AND urls.id=$2`, [token, id]);


        if (user.id_user !== user.user_id) return res.sendStatus(401);
 
        req.deleteOne = {token, id}
        next();
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}