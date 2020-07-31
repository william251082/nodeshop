"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var add_product_1 = require("./routes/add-product");
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
exports.app = app;
app.use(body_parser_1.default.urlencoded());
app.use(add_product_1.addProductRouter);
app.post('/product', function (req, res, next) {
    console.log(req.body);
    res.redirect('/');
});
app.use('/', function (req, res) {
    res.send('<h1>Hi from express</h1>');
});
