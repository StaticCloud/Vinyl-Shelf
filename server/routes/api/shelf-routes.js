const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { user_id, name } = req.body;

    try {
        const shelf = await prisma.shelf.create({
            data: {
                user_id,
                name
            }
        })
    
        res.json(shelf)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

router.post('/addVinyl/:shelfId/:vinylId', async (req, res) => {
    try {
        const vinylOnShelf = await prisma.vinylOnShelf.create({
            data: {
                shelf_id: parseInt(req.params.shelfId),
                vinyl_id: parseInt(req.params.vinylId)
            }
        })

        res.json(vinylOnShelf);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

module.exports = router;