const router = require('express').Router();
const { hashSync, compareSync } = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const { signToken } = require('../../utils/auth')

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({})
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

        res.json(user)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!' })
    }
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