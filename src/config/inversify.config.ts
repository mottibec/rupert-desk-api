import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import ExpressWebServer from "../webserver/ExpressWebServer";
import IController from "../routes/IController";
import { UserRepository } from "../database/UserRepository";
import { UserService } from "../services/userService";
import authenticationController from "../routes/authentication";
import { IAuthProvider, LocalAuthProvider } from "../services/authProvider";
import JWTService from "../services/jwtService";
import AuthService from "../services/authService";
import dbManager from "../database/dbManager";
import { AccountService } from "../services/accountService";
import { AccountRepository } from "./database/AccountRepository";


const container = new Container();

//web server
container.bind<IWebServer>(TYPES.IWebServer)
    .to(ExpressWebServer)
    .inSingletonScope();

//repo
container.bind<UserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();

container.bind<AccountRepository>(TYPES.AccountRepository)
    .to(AccountRepository)
    .inSingletonScope();

//services
container.bind<AccountService>(TYPES.AccountService)
    .to(AccountService);
container.bind<UserService>(TYPES.UserService)
    .to(UserService);
container.bind<AuthService>(TYPES.AuthService)
    .to(AuthService);
container.bind<JWTService>(TYPES.JWTService)
    .to(JWTService);
container.bind<dbManager>(TYPES.DbManager)
    .to(dbManager);

//auth providers
container.bind<IAuthProvider>(TYPES.IAuthProvider)
    .to(LocalAuthProvider);

//controllers
container.bind<IController>(TYPES.IController)
    .to(UserController);
container.bind<IController>(TYPES.IController)
    .to(authenticationController);

export { container };  