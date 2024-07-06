const router = require('express').Router();
const { hashSync, compareSync } = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const { signToken } = require('../../utils/auth');
const { authMiddleware } = require('../../utils/auth');

const prisma = new PrismaClient();

// Get shelf collection and liked shelves data for all users, used for debugging
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        // Include collection of shelves
        include: {
            // Include user's collection of shelves
            shelf_collection: {
                include: {
                    // Use relational table to obtain vinyl information
                    // User has shelf collection -> shelf collection is an array of shelves => each shelf has multiple vinyls
                    vinyls_on_shelf: {
                        include: {
                            vinyl: true
                        }
                    },
                }
            },
            // Include user's liked shelves
            likes: {
                include: {
                    shelf: {
                        select: { name: true }
                    }
                }
            }
        }
    })
    res.json(users)
})

// Post a new user, common for signing up
router.post('/', async (req, res) => {
    // Destructure the username, password, and email from the request body
    const { username, email, password } = req.body;

    try {
        // Add a new user to the database via the Prisma client
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashSync(password, 10)
            }
        })

        // Sign the token once the data has been verified
        const token = signToken(user)

        // Return the user data and token as part of the response
        res.json({ token, user })
    } catch (error) {
        // Throw error 400 if there was an error in creating the user
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

// Get user by ID. Run payload through middleware to ensure user authenticity.
router.get('/:id', authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);

    // Select user by the ID.
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        // Select their shelf collection, including the vinyl data.
        select: {
            id: true,
            username: true,
            shelf_collection: {
                include: {
                    vinyls_on_shelf: {
                        include: {
                            vinyl: true
                        }
                    },
                }
            },
            // Select their collection of liked shelves, including the vinyl data.
            likes: {
                include: {
                    shelf: {
                        include: {
                            vinyls_on_shelf: {
                                include: {
                                    vinyl: true
                                }
                            },
                        }
                    }
                }
            }
        }
    })

    // Return the user as part of the response.
    res.json(user);
})

// Authenticate the user.
router.post('/login', async (req, res) => {
    // Destructure the email and password from the body.
    const { email, password } = req.body;

    try {
        // Attempt to find the user in the database.
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        // If no user could be found, throw an error.
        if (!user) {
            throw new Error('Could not find a user with that email!')
        }

        // If a user is found, compare the password in the request body with the password from the user identified by Prisma.
        const pwCheck = await compareSync(password, user.password)

        // Throw another error if passwords don't match.
        if (!pwCheck) {
            throw new Error('Invalid password!')
        }

        // Sign the token.
        const token = signToken(user)

        // Send the user data and the token back to the user.
        res.json({ token, user })
    } catch (error) {
        res.status(400).json({ message: "Something went wrong!" })
    }
})

module.exports = router;