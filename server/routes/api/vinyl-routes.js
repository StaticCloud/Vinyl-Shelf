const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const db = require('../../utils/discogs');

const prisma = new PrismaClient();

// Get album data given user query
router.get('/discogs/:query', async (req, res) => {
    const results = await db.search(req.params.query, { format: "album" })
    res.json(results)
})

// Post album to PostgresSQL database if it doesn't already exist
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
        res.status(500).json({ message: 'Something went wrong!' })
    }
})

// Get data of an album in our PostgresSQL database by ID
router.get('/:id', async (req, res) => {
    try {
        const vinyl = await prisma.vinyl.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.json(vinyl)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }

})

module.exports = router;