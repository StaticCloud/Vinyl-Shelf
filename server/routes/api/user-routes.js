const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({

    })
    res.json(users)
})

module.exports = router;