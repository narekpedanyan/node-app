const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/product', (req, res, next) => {
    res.send('<h1>The single product!</h1>');
});

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
