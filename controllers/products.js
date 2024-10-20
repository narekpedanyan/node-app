const adminData = require("../routes/admin");
const Product = require("../models/product");

exports.getAddProduct =  (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        productCSS: true,
        activeAddProduct: true,
    });
}

exports.postAddProduct =  (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        prods: [],
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
    });
}