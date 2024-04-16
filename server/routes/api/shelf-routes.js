const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', authMiddleware, async (req, res) => {
    const { name } = req.body;
    const { id } = req.user;

    try {
        const shelf = await prisma.shelf.create({
            data: {
                user_id: id,
                name
            }
        })

        res.json(shelf)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

router.get('/me', authMiddleware, async (req, res) => {
    const { id } = req.user;

    try {
        const shelves = await prisma.shelf.findMany({
            where: {
                user_id: parseInt(id)
            },
            select: {
                id: true,
                name: true,
                vinyl_on_shelf: {
                    include: {
                        vinyl: true
                    }
                }
            }
        })

        res.json(shelves)
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

router.delete('/deleteVinyl/:shelfId/:vinylId', async (req, res) => {
    try {
        const vinylOnShelf = await prisma.vinylOnShelf.delete({
            where: {
                vinyl_id_shelf_id: {
                    shelf_id: parseInt(req.params.shelfId),
                    vinyl_id: parseInt(req.params.vinylId)
                }
            }
        })

        res.json(vinylOnShelf);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const shelf = await prisma.shelf.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                name: true,
                vinyl_on_shelf: {
                    include: {
                        vinyl: true
                    }
                }
            }
        })

        res.json(shelf)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

module.exports = router;