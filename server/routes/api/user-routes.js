const router = require('express').Router();
const { hashSync } = require('bcrypt')
const { PrismaClient } = require('@prisma/client');

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

module.exports = router;