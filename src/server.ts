import App from "./app";
import { container } from "./config/inversify.config";
import { TYPES } from "./config/inversify.types";
import IController from "./routes/IController";
import { IWebServer } from "./webserver/IWebServer";
import dbManager from "./database/dbManager";
import config from "./config/config";

const port = config.PORT;
var db = container.get<dbManager>(TYPES.DbManager);
db.connect();
var controllers = container.getAll<IController>(TYPES.IController)
var webServer = container.get<IWebServer>(TYPES.IWebServer);
const app = new App(webServer, controllers);
app.start(port);