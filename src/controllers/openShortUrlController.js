import { prisma } from "../database/db.js"

export default async function openShortUrlController(req, res) {
    try {
        const { shortUrl } = req.params;
        const promise = await prisma.urls.findFirst({
            where: {
                short_url: shortUrl
            }
        })
        
        if (!promise) return res.sendStatus(404);

        let visitedNumber = promise.visited += 1;

        await prisma.urls.update({
            data: {
                short_url: shortUrl,
                visited: visitedNumber
            }
        })
        res.redirect(promise);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}