const router = require('express').Router();
const userRoutes = require('./user-routes');
const shelfRoutes = require('./shelf-routes');
const vinylRoutes = require('./vinyl-routes');

router.use('/users', userRoutes);
router.use('/vinyls', vinylRoutes);
router.use('/shelf', shelfRoutes);

module.exports = router;