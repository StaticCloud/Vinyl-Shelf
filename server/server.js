// Create our Express instance, apply middleware, and start our server
const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Point app to dist directory for static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(routes);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}! 🚀🚀🚀`))