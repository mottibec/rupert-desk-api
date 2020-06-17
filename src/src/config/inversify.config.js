"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_types_1 = require("./inversify.types");
var ExpressWebServer_1 = __importDefault(require("../webserver/ExpressWebServer"));
var authentication_1 = __importDefault(require("../routes/authentication"));
var authProvider_1 = require("../services/authProvider");
var jwtService_1 = __importDefault(require("../services/jwtService"));
var authService_1 = __importDefault(require("../services/authService"));
var tableau_1 = require("../integrations/tableau");
var integration_1 = __importDefault(require("../routes/integration"));
var workbook_1 = require("../routes/workbook");
var container = new inversify_1.Container();
exports.container = container;
//web server
container.bind(inversify_types_1.TYPES.IWebServer)
    .to(ExpressWebServer_1.default)
    .inSingletonScope();
//repo
//services
container.bind(inversify_types_1.TYPES.AuthService)
    .to(authService_1.default);
container.bind(inversify_types_1.TYPES.JWTService)
    .to(jwtService_1.default);
//integrations
container.bind(inversify_types_1.TYPES.IIntegrationProvider)
    .to(tableau_1.tableauIntegration);
//auth providers
container.bind(inversify_types_1.TYPES.IAuthProvider)
    .to(authProvider_1.LocalAuthProvider);
//controllers
container.bind(inversify_types_1.TYPES.IController)
    .to(authentication_1.default);
container.bind(inversify_types_1.TYPES.IController)
    .to(integration_1.default);
container.bind(inversify_types_1.TYPES.IController)
    .to(workbook_1.workbookController);
