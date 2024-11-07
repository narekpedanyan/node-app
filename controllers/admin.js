const Product = require("../models/product");

exports.getAddProduct =  (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
    });
}

exports.postAddProduct =  (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(
        null,
        title,
        imageUrl,
        price,
        description,
    );
    product.save();
    res.redirect('/');
}

exports.getEditProduct =  (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    });
}

exports.postEditProduct =  (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice,
    );
    updatedProduct.save();
    res.redirect('/admin');
};

exports.getProducts =  (req, res, next) => {
    Product.fetchAll((data) => {
        res.render('admin/products', {
            prods: data,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};

exports.postDeleteProduct =  (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId, 'prodId');
    Product.deleteById(prodId);
    res.redirect(`/admin/products`);
}