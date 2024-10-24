const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

const products = [];
module.exports = class Product {
    constructor(
        title,
        imageUrl,
        description,
        price,
    ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products, null, 2), (err) => {
                console.log(err, 'err');
            })
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            cb(product);
        });
    }
}