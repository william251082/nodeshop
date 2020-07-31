"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var add_product_1 = require("./routes/add-product");
var app = express_1.default();
exports.app = app;
app.use('/', function (req, res, next) {
    console.log('This always runs');
    next();
});
app.use(add_product_1.addProductRouter);
app.use('/', function (req, res) {
    console.log('in another the middleware');
    res.send('<h1>Hi from express</h1>');
});
