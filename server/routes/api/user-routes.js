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

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashSync(password, 10)
        }
    })

    res.json(user)
})

module.exports = router;