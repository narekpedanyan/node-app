const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/product', (req, res, next) => {
    console.log(req.body);
    res.send('<h1>The single product!</h1>');
});

router.use('/admin/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// router.post('/admin/add-product', (req, res, next) => {
//    console.log(req.body);
//    res.redirect('/');
// });

module.exports = router;
