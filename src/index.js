"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var product_1 = require("./models/product");
var user_1 = require("./models/user");
var database_1 = require("./util/database");
var cart_1 = require("./models/cart");
var cart_item_1 = require("./models/cart-item");
var start = function () {
    console.log('app started');
};
product_1.Product.belongsTo(user_1.User, { constraints: true, onDelete: 'CASCADE' });
user_1.User.hasMany(product_1.Product);
user_1.User.hasOne(cart_1.Cart);
cart_1.Cart.belongsTo(user_1.User);
cart_1.Cart.belongsToMany(product_1.Product, { through: cart_item_1.CartItem });
product_1.Product.belongsToMany(cart_1.Cart, { through: cart_item_1.CartItem });
database_1.sequelize
    .sync({ force: true }) // force only on dev
    .then(function (result) {
    // console.log(result);
    return user_1.User.findByPk(1);
})
    .then(function (user) {
    if (!user) {
        return user_1.User.create({ name: 'Max', email: "test@test.com" });
    }
    return user;
})
    .then(function (user) {
    return user.getCart();
})
    .then(function (user) {
    app_1.app.listen(3001, function () {
        console.log('Listening on port 3001, nodeshop');
    });
})
    .catch(function (err) {
    console.log(err);
});
start();
