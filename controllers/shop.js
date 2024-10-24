const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('shop/product-list', {
            prods: data,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        console.log(product, 'product');
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('shop/index', {
            prods: data,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}

exports.getCart = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
        });
    });
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
        });
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    })
}