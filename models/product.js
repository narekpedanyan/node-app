const products = [
    // {
    //     src: '',
    //     title: 'Title 1',
    //     price: '$100',
    //     description: 'Description 1',
    // },
];
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }
    save() {
        products.push(this);
    }
    static fetchAll() {
        return products;
    }
}