const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const shelf = await prisma.shelf.create({

    })
    res.json(shelf)
})

module.exports = router;