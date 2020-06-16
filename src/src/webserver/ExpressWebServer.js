"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_2 = __importDefault(require("express"));
var inversify_1 = require("inversify");
var passport_1 = __importDefault(require("passport"));
var body_parser_1 = __importDefault(require("body-parser"));
var jwtService_1 = __importDefault(require("../services/jwtService"));
var inversify_types_1 = require("../config/inversify.types");
var cors_1 = __importDefault(require("cors"));
var ExpressWebServer = /** @class */ (function () {
    function ExpressWebServer() {
        this._app = express_2.default();
        this._app.use(body_parser_1.default.urlencoded({ extended: false }));
        this._app.use(body_parser_1.default.json());
        this._app.use(passport_1.default.initialize());
        this._app.use(cors_1.default());
        this._router = express_1.Router();
    }
    ExpressWebServer.prototype.start = function (port, callback) {
        this._app.use('/', this._router);
        this._app.use(this.handleError);
        this._app.listen(port, callback);
    };
    ExpressWebServer.prototype.registerGet = function (routeTemplate, callback) {
        this._router.get(routeTemplate, function (request, response) {
            return callback(request, response);
        });
    };
    ExpressWebServer.prototype.registerPost = function (routeTemplate, callback) {
        this._router.post(routeTemplate, function (request, response, next) {
            callback(request, response, next);
        });
    };
    ExpressWebServer.prototype.registerProtectedGet = function (routeTemplate, callback) {
        this._router.get(routeTemplate, this._jwtService.verifyToken(), function (request, response) {
            return callback(request, response);
        });
    };
    ExpressWebServer.prototype.registerProtectedPost = function (routeTemplate, callback) {
        this._router.post(routeTemplate, this._jwtService.verifyToken(), function (request, response, next) {
            return callback(request, response, next);
        });
    };
    ExpressWebServer.prototype.registerProtectedPut = function (routeTemplate, callback) {
        this._router.put(routeTemplate, this._jwtService.verifyToken(), function (request, response, next) {
            return callback(request, response, next);
        });
    };
    ExpressWebServer.prototype.handleError = function (err, req, res, next) {
        res.status(500);
        res.send({ error: err });
    };
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.JWTService),
        __metadata("design:type", jwtService_1.default)
    ], ExpressWebServer.prototype, "_jwtService", void 0);
    ExpressWebServer = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ExpressWebServer);
    return ExpressWebServer;
}());
exports.default = ExpressWebServer;
