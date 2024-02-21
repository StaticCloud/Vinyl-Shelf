const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
var discogs = require('disconnect').Client;

const prisma = new PrismaClient();

require('dotenv').config();

const db = new discogs({
    consumerKey: process.env.DISCOGS_CONSUMER_KEY,
    consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
}).database();

router.get('/discogs/popular', async (req, res) => {
    const results = await db.search({ format: "album" })
    res.json(results)
})

router.get('/discogs/:query', async (req, res) => {
    const results = await db.search(req.params.query, { format: "album" })
    res.json(results)
})

router.post('/', async (req, res) => {
    const { title, id, cover_image } = req.body;

    try {
        const vinyl = await prisma.vinyl.create({
            data: {
                id,
                title,
                cover_image
            }
        })

        res.json(vinyl)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const vinyl = await prisma.vinyl.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.json(vinyl)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }

})

module.exports = router;