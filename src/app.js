"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
exports.app = app;
app.use(function (req, res, next) {
    console.log('in the middleware');
    next(); // Allows the request to continue to the next middleware in line
});
