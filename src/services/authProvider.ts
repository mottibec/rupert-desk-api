import { IWebServer } from "../webserver/IWebServer";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import config from "../config/config";
import { injectable, inject } from "inversify";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import JWTService from "./jwtService";
import { TYPES } from "../config/inversify.types";
import AuthService from "./authService";

export interface IAuthProvider {
    register(webServer: IWebServer, route: string): void;
    verifyAccount(...arg: any): void;
}

@injectable()
export class LocalAuthProvider implements IAuthProvider {

    @inject(TYPES.JWTService)
    private _jwtService!: JWTService;

    private _accountService!: any;

    @inject(TYPES.AuthService)
    private _authService!: AuthService;

    register(webServer: IWebServer, route: string): void {
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        }, async (...args) => this.verifyAccount(...args)));

        webServer.registerPost(`${route}/login`, (request: any, response: any, next: any) =>
            passport.authenticate("local", { session: false }, (err, user, info) => {
                if (err || !user) {
                    return response
                        .status(400)
                        .json({
                            error: err,
                            user: user,
                            info: info
                        });
                }
                const token = this._jwtService.sign(user);
                return response.json({ username: user.name, access_token: token });
            })(request, response, next)
        );
        this._jwtService.register();
    }
    async verifyAccount(userName: string, password: string, callback: Function) {
        const account = await this._accountService.findByEmail(userName);
        if (!account) {
            return callback(null, false, "invalid user name or password");
        }
        const doseMatch = await this._authService.verifyHash(password, account.password || "");
        if (!doseMatch) {
            return callback(null, false, "invalid user name or password");
        }
        return callback(null, { email: account.email, name: account.name });

    }
}