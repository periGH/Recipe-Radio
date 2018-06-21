"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("config");
var users_1 = require("./models/users");
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var Router = require("koa-router");
var url = config_1.mongo_url;
var username = null;
var users = null;
var options = {};
mongoose_1.connect(url, function (err) {
    if (err)
        throw err;
    console.log('Successfully connected to MongoDB');
});
// create a user a new user
var testUser = new users_1["default"]({
    username: 'bigbassroller400',
    email: 'bigbassroller900@bigbassroller700.com',
    password: 'Password123'
});
console.log("testUser: ", testUser);
// Make this async
testUser.save(function (err, testUser) {
    console.log("testUser save!!!!!!!");
    if (err)
        return console.error(err);
});
users_1["default"].find(function (err, result) {
    if (err)
        return console.error(err);
    users = result;
});
users_1["default"].findOne({ username: "bigbassroller400" }, function (err, result) {
    if (err)
        return console.error(err);
    username = result;
});
var app = new Koa();
var router = new Router();
app.use(bodyParser());
router.get('/', function (ctx) { return ctx.body = username; });
app.use(router.routes());
// Start the application
app.listen(config_1.port, function () {
    return console.log("Server is running at http://localhost:" + config_1.port + "/");
});
exports["default"] = app;
