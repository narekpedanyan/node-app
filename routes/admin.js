const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [
    {
        src: '',
        title: 'Title 1',
        price: '$100',
        description: 'Description 1',
    },
    {
        src: '',
        title: 'Title 2',
        price: '$200',
        description: 'Description 2',
    },
];

router.get('/product', (req, res, next) => {
    console.log(req.body);
    res.send('<h1>The single product!</h1>');
});

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
    });
});

router.post('/add-product', (req, res, next) => {
   console.log(req.body);
   products.push({ title: req.body.title });
   res.redirect('/');
});

exports.routes = router;
exports.products = products;
