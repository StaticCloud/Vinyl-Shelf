const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Add a like given a user ID and shelf ID.
router.post('/:userId/:shelfId', async (req, res) => {
    try {
        // Create a new like object given a user ID and a shelf ID.
        const like = await prisma.like.create({
            data: {
                user_id: parseInt(req.params.userId),
                shelf_id: parseInt(req.params.shelfId)
            }
        })

        // Return our new like row.
        res.json(like)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Delete a like given a user ID and shelf ID.
router.delete('/:userId/:shelfId', async (req, res) => {
    try {
        const deleteLike = await prisma.like.delete({
            where: {
                // Since likes have a composite primary key (user_id, shelf_id), we have to delete a row in our like table given these two IDs.
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