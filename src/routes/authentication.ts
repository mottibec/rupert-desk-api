import IController from "./IController";
import { TYPES } from "../config/inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import { inject, multiInject, injectable } from "inversify";
import { IAuthProvider } from "../services/authProvider";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import { UserService } from "../services/userService";
import JWTService from "../services/jwtService";
import AuthService from "../services/authService";
import { AccountService } from "../services/accountService";

@injectable()
export default class authenticationController implements IController {
    route: string = "/auth";

    @inject(TYPES.IWebServer)
    private _webServer!: IWebServer;

    @multiInject(TYPES.IAuthProvider)
    private _providers!: IAuthProvider[];

    @inject(TYPES.JWTService)
    private _tokenService!: JWTService;

    @inject(TYPES.AuthService)
    private _authService!: AuthService;

    initRoutes(): void {
        this._providers.forEach(provider => provider.register(this._webServer, this.route));
        this._webServer.registerPost(`${this.route}/signup`, (request: IRequest, response: IResponse) =>
            this.signUp(request, response));
    }
    async signUp(request: IRequest, response: IResponse) {
        const signUpData = request.body;
        const savedUser = await this._accountService.findByEmail(signUpData.email);
        if (savedUser) {
            return response
                .status(400)
                .json({
                    error: "The email address you have entered is already registered"
                });
        }

        let { user, account } = await this.createUser(signUpData);
        const userResult = await this._userService.createUser(user);
        const accountResult = await this._accountService.createAccount(account);
        if (userResult && accountResult) {
            var token = this._tokenService.sign({ email: account.email });
            response.send({ access_token: token, username: user.name });
        }
        response.status(400);
    }
    async createUser(signUpData: any): Promise<any> {
        var instagramData = await this._igService.getUserInfo(signUpData.instagram);
        var user = <iUser>{
            name: instagramData.name,
            email: signUpData.email,
            avatar: instagramData.profile,
            instagram: signUpData.instagram,
            topPost: instagramData.topPost,
            whatsapp: signUpData.whatsapp,
            followersCount: instagramData.followersCount,
            activeFollowers: instagramData.activeFollowers,
            conversionRate: signUpData.conversionRate,
            priceForPost: signUpData.priceForPost,
            location: signUpData.location
        };

        var account = <iAccount>{
            name: instagramData.name,
            email: signUpData.email,
            avatar: instagramData.profile,
            gender: gender.other,
            authProvider: authProvider.local,
            password: signUpData.password
        };

        account.password = await this._authService.hash(signUpData.password);

        return { user, account };
    }
}