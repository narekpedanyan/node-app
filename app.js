const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.engine('handlebars', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: '.handlebars',
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const currentUserId = 1;

app.use((req,res,next)=>{
    User.findByPk(currentUserId)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
    through: CartItem,
});
Product.belongsToMany(Cart, {
    through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
    through: OrderItem
});

let currentUser;
sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(currentUserId);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Arturo Gatti', email: 'naropedan+1@gmail.com' });
        }
        return user;
    })
    .then(user => {
        currentUser = user;
        return user.getCart();
    })
    .then(cart => {
        if (!cart) {
            return currentUser.createCart();
        }
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => console.log(err));