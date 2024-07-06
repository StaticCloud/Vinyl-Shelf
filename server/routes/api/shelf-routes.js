const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Post a new shelf to the database using the name from the payload, and the user ID verified by our middleware.
router.post('/', authMiddleware, async (req, res) => {
    const { name } = req.body;
    const { id } = req.user;

    try {
        // Attempt to create a new shelf using the destructured data.
        const shelf = await prisma.shelf.create({
            data: {
                user_id: id,
                name
            }
        })

        // Return the shelf as our response.
        res.json(shelf)
    } catch (error) {
        // Throw a 400 error if the shelf could not be created.
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Delete a shelf given a shelf ID and the authenticate user's ID.
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Delete the shelf given a shelf ID and an author ID.
        const shelf = await prisma.shelf.delete({
            where: {
                id: parseInt(req.params.id),
                user_id: req.user.id
            }
        })

        // Return the shelf as verification.
        res.json(shelf)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// Getting authenticate user's shelves when adding an album to a shelf.
router.get('/me', authMiddleware, async (req, res) => {
    const { id } = req.user;

    try {
        // Find all the authenticated user's shelves.
        const shelves = await prisma.shelf.findMany({
            where: {
                user_id: parseInt(id)
            },
            select: {
                id: true,
                name: true,
                vinyls_on_shelf: {
                    include: {
                        vinyl: true
                    }
                }
            }
        })

        // Return the shelves to be rendered React.
        res.json(shelves)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Add a vinyl to a shelf given a vinyl ID and a shelf ID.
router.post('/addVinyl/:shelfId/:vinylId', async (req, res) => {
    try {
        // Create a new row in our vinyls_on_shelf relational table given the ID of a shelf and a vinyl.
        const vinylsOnShelf = await prisma.vinyslOnShelf.create({
            data: {
                shelf_id: parseInt(req.params.shelfId),
                vinyl_id: parseInt(req.params.vinylId)
            }
        })

        // Return the new row in our relational table.
        res.json(vinylsOnShelf);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Delete a vinyl from a shelf given a vinyl ID and a shelf ID.
router.delete('/deleteVinyl/:shelfId/:vinylId', async (req, res) => {
    try {
        // Delete a row in our vinyls_on_shelf relational table given the ID of a shelf and a vinyl.
        const deletedFromShelf = await prisma.vinyslOnShelf.delete({
            where: {
                vinyl_id_shelf_id: {
                    shelf_id: parseInt(req.params.shelfId),
                    vinyl_id: parseInt(req.params.vinylId)
                }
            }
        })

        res.json(deletedFromShelf);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Get a specific shelf given a shelf ID.
router.get('/:id', async (req, res) => {
    try {
        const shelf = await prisma.shelf.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                name: true,
                vinyls_on_shelf: {
                    include: {
                        vinyl: true
                    }
                },
                likes: {
                    include: {
                        user: true
                    }
                },
                user_id: true,
                user: true
            }
        })

        // Return the data of our shelf to be rendered in React.
        res.json(shelf)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Update a shelf given a shelf ID.
router.put('/:id', async (req, res) => {
    try {
        // Allow user's to update the name of a shelf given a shelf ID and a title from the body.
        const shelf = await prisma.shelf.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name: req.body.title
            }
        })

        res.json(shelf);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Allow users to look up shelf names. This is used in the search page.
router.get('/search/:query', async (req, res) => {
    const query = req.params.query;

    try {
        const shelves = await prisma.shelf.findMany({
            where: {
                // Remove case sensitivity when querying shelves by name for more accurate results.
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                name: true,
                vinyls_on_shelf: {
                    include: {
                        vinyl: true
                    }
                },
                likes: {
                    include: {
                        user: true
                    }
                },
                user: true
            }
        })

        // Return all shelves obtained from the query.
        res.json(shelves)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

module.exports = router;