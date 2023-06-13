import { prisma } from "../database/db.js";

export default async function getUrlShortenController(req, res) {
    try {
        const { id } = req.params;
        const idUrl = await prisma.urls.findFirstOrThrow({
            where: {
                id: Number(id)
            }
        })

        res.send(idUrl);
    } catch(err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}