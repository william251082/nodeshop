"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var body_parser_1 = __importDefault(require("body-parser"));
var admin_1 = require("./routes/admin");
var shop_1 = require("./routes/shop");
var not_found_error_1 = require("./errors/not-found-error");
var app = express_1.default();
exports.app = app;
app.use(body_parser_1.default.urlencoded());
app.use(admin_1.adminRoutes);
app.use(shop_1.shopRoutes);
app.use('/', function (req, res) {
    var not_found_error = new not_found_error_1.NotFoundError();
    res.status(404).send(not_found_error.htmlErrors());
});
