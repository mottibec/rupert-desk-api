import IController from "./controller";
import { TYPES } from "../config/inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import { inject, multiInject, injectable } from "inversify";
import { IAuthProvider } from "../services/authProvider";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import JWTService from "../services/jwtService";
import { userService } from "../services/userService";
import passwordHashService from "../services/passwordHashService";

@injectable()
export default class authenticationController implements IController {
    route: string = "/auth";

    @inject(TYPES.IWebServer)
    private _webServer!: IWebServer;

    @multiInject(TYPES.IAuthProvider)
    private _providers!: IAuthProvider[];

    @inject(TYPES.JWTService)
    private _tokenService!: JWTService;

    @inject(TYPES.passwordHashService)
    private _passwordHash!: passwordHashService;

    @inject(TYPES.userService)
    private _userService!: userService;

    initRoutes(): void {
        this._providers.forEach(provider => provider.register(this._webServer, this.route));
        this._webServer.registerPost(`${this.route}/signup`, (request: IRequest, response: IResponse) =>
            this.signUp(request, response));
    }
    async signUp(request: IRequest, response: IResponse) {
        const signUpData = request.body;
        const savedUser = await this._userService.findByEmail(signUpData.email);
        if (savedUser) {
            return response
                .status(400)
                .json({
                    error: "The email address you have entered is already registered"
                });
        }

        let user = await this.createUser(signUpData);
        const userResult = await this._userService.createUser(user);
        if (userResult) {
            var token = this._tokenService.sign({ email: user.email });
            response.send({ access_token: token, username: user.name });
        }
        response.status(400);
    }
    async createUser(signUpData: any): Promise<any> {
        const user = {
            password: ""
        };
        user.password = await this._passwordHash.hash(signUpData.password);
        return user;
    }
}