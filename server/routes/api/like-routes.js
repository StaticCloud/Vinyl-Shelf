const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/:userId/:shelfId', async (req, res) => {
    try {
        const like = await prisma.like.create({
            data: {
                user_id: parseInt(req.params.userId),
                shelf_id: parseInt(req.params.shelfId)
            }
        })

        res.json(like)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

router.delete('/:userId/:shelfId', async (req, res) => {
    try {
        const deleteLike = await prisma.like.delete({
            where: {
                user_id_shelf_id: {
                    user_id: parseInt(req.params.userId),
                    shelf_id: parseInt(req.params.shelfId)
                }
            }
        })

        res.json(deleteLike)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

module.exports = router;