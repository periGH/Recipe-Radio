"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var users_1 = require("./controllers/users");
var recipes_1 = require("./controllers/recipes");
var authenticate_1 = require("./middlewares/authenticate");
var jwt_1 = require("./middlewares/jwt");
var router = new Router();
router
    .get('/api/users/', users_1["default"].find)
    .get('/api/users/:id', users_1["default"].findById)
    .post('/api/users/', users_1["default"].register)
    .put('/api/users/:id', jwt_1["default"], users_1["default"].update)["delete"]('/api/users/:id', jwt_1["default"], users_1["default"]["delete"])
    // Recipe Routes
    .get('/api/recipes/', recipes_1["default"].find)
    .get('/api/recipes/:id', recipes_1["default"].findById)
    .post('/api/recipes/', recipes_1["default"].add)
    .put('/api/recipes/:id', jwt_1["default"], recipes_1["default"].update)["delete"]('/api/recipes/:id', jwt_1["default"], recipes_1["default"]["delete"])
    // Authentication Routes
    .post('/authenticate', authenticate_1["default"])
    .post('/login/', authenticate_1["default"]);
//.post('/logout/', LoginControllers.logout)
exports["default"] = router;
