const path = require('path');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products, 'bozy ');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;