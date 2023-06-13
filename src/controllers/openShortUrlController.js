import { prisma } from "../database/db.js"

export default async function openShortUrlController(req, res) {
    try {
        const { shortUrl } = req.params;
        const promise = await prisma.urls.findFirstOrThrow({
            where: {
                short_url: shortUrl
            }
        })

        let visitedNumber = promise.visited += 1;

        await prisma.urls.update({
            data: {
                short_url: shortUrl,
                visited: visitedNumber
            },
            where: {
                id: promise.id
            }
        })
        console.log(promise)
        res.redirect(promise.url);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}