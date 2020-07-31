"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var body_parser_1 = __importDefault(require("body-parser"));
var admin_1 = require("./routes/admin");
var shop_1 = require("./routes/shop");
var path = __importStar(require("path"));
var app = express_1.default();
exports.app = app;
app.use(body_parser_1.default.urlencoded());
app.use('/admin', admin_1.adminRoutes);
app.use(shop_1.shopRoutes);
app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
