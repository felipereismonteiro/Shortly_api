import { prisma } from "../database/db.js";

export default async function deleteShortUrlController(req, res) {
    try {
        const { token, id } = req.deleteOne;
        await prisma.urls.delete({
            where: {
                id: Number(id)
            }
        })
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}