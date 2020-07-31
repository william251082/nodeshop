"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var start = function () {
    console.log('app started');
};
app_1.app.listen(3001, function () {
    console.log('Listening on port 3001, nodeshop');
});
start();
