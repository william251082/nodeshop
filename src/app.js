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
var path = __importStar(require("path"));
var not_found_error_1 = require("./errors/not-found-error");
var app = express_1.default();
exports.app = app;
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(body_parser_1.default.urlencoded());
app.use(express_1.default.static(path.join(__dirname, 'public')));
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
app.use(not_found_error_1.notFoundError);
app.listen(3000, function () {
    console.log('Listening on port 3000, nodeshop');
});
