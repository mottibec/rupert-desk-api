import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import ExpressWebServer from "../webserver/ExpressWebServer";
import IController from "../routes/IController";
import authenticationController from "../routes/authentication";
import { IAuthProvider, LocalAuthProvider } from "../services/authProvider";
import JWTService from "../services/jwtService";
import AuthService from "../services/authService";
import { tableauIntegration } from "../integrations/tableau";
import integrationController from "../routes/integrationController";


const container = new Container();

//web server
container.bind<IWebServer>(TYPES.IWebServer)
    .to(ExpressWebServer)
    .inSingletonScope();

//repo

//services
container.bind<AuthService>(TYPES.AuthService)
    .to(AuthService);
container.bind<JWTService>(TYPES.JWTService)
    .to(JWTService);

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

export { container };  