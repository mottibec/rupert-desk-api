"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var inversify_config_1 = require("./inversify.config");
var inversify_types_1 = require("./inversify.types");
var config_1 = __importDefault(require("./config/config"));
var port = config_1.default.PORT;
var db = inversify_config_1.container.get(inversify_types_1.TYPES.DbManager);
db.connect();
var controllers = inversify_config_1.container.getAll(inversify_types_1.TYPES.IController);
var webServer = inversify_config_1.container.get(inversify_types_1.TYPES.IWebServer);
var app = new app_1.default(webServer, controllers);
app.start(port);
