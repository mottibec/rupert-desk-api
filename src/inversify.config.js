"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_types_1 = require("./inversify.types");
var ExpressWebServer_1 = __importDefault(require("./webserver/ExpressWebServer"));
var users_1 = __importDefault(require("./routes/users"));
var UserRepository_1 = require("./database/UserRepository");
var userService_1 = require("./services/userService");
var authentication_1 = __importDefault(require("./routes/authentication"));
var authProvider_1 = require("./services/authProvider");
var jwtService_1 = __importDefault(require("./services/jwtService"));
var authService_1 = __importDefault(require("./services/authService"));
var dbManager_1 = __importDefault(require("./database/dbManager"));
var igService_1 = __importDefault(require("./services/igService"));
var frontend_1 = __importDefault(require("./routes/frontend"));
var accountService_1 = require("./services/accountService");
var AccountRepository_1 = require("./database/AccountRepository");
var container = new inversify_1.Container();
exports.container = container;
//web server
container.bind(inversify_types_1.TYPES.IWebServer)
    .to(ExpressWebServer_1.default)
    .inSingletonScope();
//repo
container.bind(inversify_types_1.TYPES.UserRepository)
    .to(UserRepository_1.UserRepository)
    .inSingletonScope();
container.bind(inversify_types_1.TYPES.AccountRepository)
    .to(AccountRepository_1.AccountRepository)
    .inSingletonScope();
//services
container.bind(inversify_types_1.TYPES.AccountService)
    .to(accountService_1.AccountService);
container.bind(inversify_types_1.TYPES.UserService)
    .to(userService_1.UserService);
container.bind(inversify_types_1.TYPES.AuthService)
    .to(authService_1.default);
container.bind(inversify_types_1.TYPES.JWTService)
    .to(jwtService_1.default);
container.bind(inversify_types_1.TYPES.DbManager)
    .to(dbManager_1.default);
container.bind(inversify_types_1.TYPES.IgService)
    .to(igService_1.default);
//auth providers
container.bind(inversify_types_1.TYPES.IAuthProvider)
    .to(authProvider_1.LocalAuthProvider);
container.bind(inversify_types_1.TYPES.IAuthProvider)
    .to(authProvider_1.GoogleAuthProvider);
container.bind(inversify_types_1.TYPES.IAuthProvider)
    .to(authProvider_1.FacebookAuthProvider);
//controllers
container.bind(inversify_types_1.TYPES.IController)
    .to(users_1.default);
container.bind(inversify_types_1.TYPES.IController)
    .to(authentication_1.default);
container.bind(inversify_types_1.TYPES.IController)
    .to(frontend_1.default);
