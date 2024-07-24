const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/users', require('./user'));
router.use('/orders', require('./order'));

module.exports = router;
