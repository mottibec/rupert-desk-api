import App from "./app";
import { container } from "./config/inversify.config";
import { TYPES } from "./config/inversify.types";
import IController from "./routes/controller";
import { IWebServer } from "./webserver/IWebServer";
import config from "./config/config";
import { databaseManager } from "./database/databaseManager";

const port = config.PORT;
const controllers = container.getAll<IController>(TYPES.IController)
const webServer = container.get<IWebServer>(TYPES.IWebServer);
const dbManager = container.get<databaseManager>(TYPES.databaseManager);
dbManager.initilize();
const app = new App(webServer, controllers);
app.start(port);