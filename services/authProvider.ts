import { IWebServer } from "../webserver/IWebServer";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { injectable, inject } from "inversify";
import JWTService from "./jwtService";
import { TYPES } from "../config/inversify.types";
import passwordHashService from "./passwordHashService";
import { userService } from "./userService";

export interface IAuthProvider {
    register(webServer: IWebServer, route: string): void;
    verifyAccount(...arg: any): void;
}

@injectable()
export class LocalAuthProvider implements IAuthProvider {

    @inject(TYPES.JWTService)
    private _jwtService!: JWTService;

    @inject(TYPES.userService)
    private _userService!: userService;

    @inject(TYPES.passwordHashService)
    private _passwordHash!: passwordHashService;

    register(webServer: IWebServer, route: string): void {
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        }, async (...args) => this.verifyAccount(...args)));

        webServer.registerPost(`${route}/signin`, (request: any, response: any, next: any) =>
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
                return response.json({ username: user.email, access_token: token });
            })(request, response, next)
        );
        this._jwtService.register();
    }
    async verifyAccount(userName: string, password: string, callback: Function) {
        const user = await this._userService.findByEmail(userName);
        if (!user) {
            return callback(null, false, "invalid user name or password");
        }
        const doseMatch = await this._passwordHash.verifyHash(password, user.hashedPassword || "");
        if (!doseMatch) {
            return callback(null, false, "invalid user name or password");
        }
        return callback(null, { email: user.email, name: user.name });
    }
}