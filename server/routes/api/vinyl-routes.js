const router = require('express').Router();
var discogs = require('disconnect').Client;

require('dotenv').config();

const db = new discogs({
    consumerKey: process.env.DISCOGS_CONSUMER_KEY,
    consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
}).database();

router.get('/:query', async (req, res) => {
    const data = await db.search(req.params.query, { format: "album" })
    res.json(data)
})

module.exports = router;