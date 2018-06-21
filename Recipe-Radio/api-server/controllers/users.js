"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var users_1 = require("../models/users");
var UsersControllers = /** @class */ (function () {
    function UsersControllers() {
    }
    /**
     * Get all data
     * @param {ctx} Koa Context
     */
    UsersControllers.prototype.find = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx;
                        return [4 /*yield*/, users_1["default"].find()];
                    case 1:
                        _a.body = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Register a user
     * @param {ctx} Koa Context
     */
    UsersControllers.prototype.register = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var canidate, _a, username, email, data, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        canidate = ctx.request.body;
                        _a = ctx.request.body, username = _a.username, email = _a.email;
                        return [4 /*yield*/, users_1["default"].findOne({ $or: [{ 'username': username }, { 'email': email }] })];
                    case 1:
                        canidate = _b.sent();
                        if (canidate && canidate.username == username) {
                            ctx["throw"](401, 'THIS USERNAME IS ALREADY TAKEN');
                        }
                        if (canidate && canidate.email == email) {
                            ctx["throw"](401, 'THIS EMAIL IS ALREADY TAKEN');
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, new users_1["default"](ctx.request.body).save()];
                    case 3:
                        data = _b.sent();
                        if (data) {
                            ctx.status = 307;
                            ctx.redirect('/authenticate');
                            ctx.body = data;
                        }
                        else {
                            ctx.status = 400;
                            ctx.body = { status: 'error' };
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        ctx["throw"](422);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find a user
     * @param {ctx} Koa Context
     */
    UsersControllers.prototype.findById = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_1["default"].findById(ctx.params.id)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            ctx["throw"](404);
                        }
                        ctx.body = data;
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        if (err_2.name === 'CastError' || err_2.name === 'NotFoundError') {
                            ctx["throw"](404);
                        }
                        ctx["throw"](500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update a data
     * @param {ctx} Koa Context
     */
    UsersControllers.prototype.update = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_1["default"].findByIdAndUpdate(ctx.params.id, ctx.request.body)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            ctx["throw"](404);
                        }
                        ctx.body = data;
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        if (err_3.name === 'CastError' || err_3.name === 'NotFoundError') {
                            ctx["throw"](404);
                        }
                        ctx["throw"](500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a data
     * @param {ctx} Koa Context
     */
    UsersControllers.prototype["delete"] = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_1["default"].findByIdAndRemove(ctx.params.id)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            ctx["throw"](404);
                        }
                        ctx.body = data;
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        if (err_4.name === 'CastError' || err_4.name === 'NotFoundError') {
                            ctx["throw"](404);
                        }
                        ctx["throw"](500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersControllers;
}());
exports["default"] = new UsersControllers();
