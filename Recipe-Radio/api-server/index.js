"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("config");
var logger = require("koa-logger");
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var cors = require("@koa/cors");
var routes_1 = require("./routes");
var url = config_1.mongo_url;
var username = null;
var users = null;
var options = {};
mongoose_1.connect(url, function (err) {
    if (err)
        throw err;
    console.log('Successfully connected to MongoDB');
});
var app = new Koa();
app
    .use(logger())
    .use(cors())
    .use(bodyParser())
    .use(routes_1["default"].routes())
    .use(routes_1["default"].allowedMethods());
// Start the application
app.listen(config_1.port, function () {
    return console.log("Server is running at http://localhost:" + config_1.port + "/");
});
exports["default"] = app;
