import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import ExpressWebServer from "../webserver/ExpressWebServer";
import IController from "../routes/controller";
import authenticationController from "../routes/authentication";
import { IAuthProvider, LocalAuthProvider } from "../services/authProvider";
import JWTService from "../services/jwtService";
import { tableauIntegration } from "../integrations/tableau";
import integrationController from "../routes/integration";
import { workbookController } from "../routes/workbook";
import workbookService from "../services/workbookService";
import passwordHashService from "../services/passwordHashService";
import { userService } from "../services/userService";
import { workbookRepository } from "../database/workbookRepository";
import { databaseManager } from "../database/databaseManager";
import { userRepository } from "../database/userRepository"


const container = new Container();

//web server
container.bind<IWebServer>(TYPES.IWebServer)
    .to(ExpressWebServer)
    .inSingletonScope();

//db
container.bind<databaseManager>(TYPES.databaseManager)
    .to(databaseManager)
    .inSingletonScope();

//repo
container.bind<workbookRepository>(TYPES.WorkbookRepository)
    .to(workbookRepository)
    .inSingletonScope();

container.bind<userRepository>(TYPES.userRepository)
    .to(userRepository)
    .inSingletonScope();

//services
container.bind<passwordHashService>(TYPES.passwordHashService)
    .to(passwordHashService);
container.bind<JWTService>(TYPES.JWTService)
    .to(JWTService);
container.bind<workbookService>(TYPES.WorkbookService)
    .to(workbookService);
container.bind<userService>(TYPES.userService)
    .to(userService);

//integrations
container.bind<tableauIntegration>(TYPES.IIntegrationProvider)
    .to(tableauIntegration);

//auth providers
container.bind<IAuthProvider>(TYPES.IAuthProvider)
    .to(LocalAuthProvider);

//controllers
container.bind<IController>(TYPES.IController)
    .to(authenticationController);
container.bind<IController>(TYPES.IController)
    .to(integrationController);
container.bind<IController>(TYPES.IController)
    .to(workbookController);

export { container };  