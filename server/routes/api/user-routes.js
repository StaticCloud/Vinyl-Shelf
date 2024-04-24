const router = require('express').Router();
const { hashSync, compareSync } = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const { signToken } = require('../../utils/auth');
const { authMiddleware } = require('../../utils/auth');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            shelf_collection: {
                include: {
                    vinyls_on_shelf: {
                        include: {
                            vinyl: true
                        }
                    },
                }
            },
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

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashSync(password, 10)
            }
        })

        const token = signToken(user)
        res.json({ token, user })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
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

    res.json(user);
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('Could not find a user with that email!')
        }

        const pwCheck = await compareSync(password, user.password)

        if (!pwCheck) {
            throw new Error('Invalid password!')
        }

        const token = signToken(user)
        res.json({ token, user })
    } catch (error) {
        res.status(400).json({ message: "Something went wrong!" })
    }
})

module.exports = router;