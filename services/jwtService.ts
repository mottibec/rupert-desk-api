import passport from "passport";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import config from "../config/config";
import jwt from "jsonwebtoken";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/inversify.types";
import { userService } from "./userService";

@injectable()
export default class JWTService {

    @inject(TYPES.userService)
    private _userService!: userService;

    register() {
        passport.use(new jwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtSecret
        }, async (jwtPayload: any, callback: Function) => {
            const account = await this._userService.findByEmail(jwtPayload.email);
            if (account) {
                return callback(null, account);
            }
            return callback("", false);

        }));
    }
    sign(item: any) {
        return jwt.sign(item, config.jwtSecret);
    }
    verifyToken() {
        return passport.authenticate('jwt', { session: false });
    }
}