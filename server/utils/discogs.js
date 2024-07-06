// Connect to the Discogs API so we can make requests for obtaining record information
const discogs = require('disconnect').Client;
require('dotenv').config();

const db = new discogs({
    consumerKey: process.env.DISCOGS_CONSUMER_KEY,
    consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
}).database();

module.exports = db;