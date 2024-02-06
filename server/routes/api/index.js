const router = require('express').Router();
const userRoutes = require('./user-routes');
const shelfRoutes = require('./shelf-routes');
const vinylRoutes = require('./vinyl-routes');
const likeRoutes = require('./like-routes');

router.use('/users', userRoutes);
router.use('/vinyls', vinylRoutes);
router.use('/shelf', shelfRoutes);
router.use('/like', likeRoutes)

module.exports = router;