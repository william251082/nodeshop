"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var product_1 = require("./models/product");
var user_1 = require("./models/user");
var database_1 = require("./util/database");
var start = function () {
    console.log('app started');
};
product_1.Product.belongsTo(user_1.User, { constraints: true, onDelete: 'CASCADE' });
user_1.User.hasMany(product_1.Product);
database_1.sequelize
    .sync()
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
    console.log(user);
    app_1.app.listen(3001, function () {
        console.log('Listening on port 3001, nodeshop');
    });
})
    .catch(function (err) {
    console.log(err);
});
start();
