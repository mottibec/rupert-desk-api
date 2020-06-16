import { IWebServer } from "./IWebServer";
import { Request, Response, Router, Application, NextFunction } from "express";
import express from "express";
import { injectable, inject } from "inversify";
import passport from "passport";
import bodyparser from "body-parser";
import JWTService from "../services/jwtService";
import { TYPES } from "../config/inversify.types";
import path from "path";
import cors from "cors";


@injectable()
export default class ExpressWebServer implements IWebServer {

    private _router: Router;
    private _app: Application;

    @inject(TYPES.JWTService)
    private _jwtService!: JWTService;

    constructor() {
        this._app = express();
        this._app.use(bodyparser.urlencoded({ extended: false }));
        this._app.use(bodyparser.json());
        this._app.use(passport.initialize());
        this._app.use(cors());
        this._router = Router();
    }
    public start(port: number, callback: () => void) {
        this._app.use('/', this._router);
        this._app.use(this.handleError);
        this._app.listen(port, callback);
    }

    public registerGet(routeTemplate: string, callback: Function): void {
        this._router.get(routeTemplate, (request: Request, response: Response) =>
            callback(request, response));
    }

    public registerPost(routeTemplate: string, callback: Function): void {
        this._router.post(routeTemplate, (request: Request, response: Response, next: Function) => {
            callback(request, response, next)
        });
    }

    registerProtectedGet(routeTemplate: string, callback: Function): void {
        this._router.get(routeTemplate, this._jwtService.verifyToken(), (request: Request, response: Response) =>
            callback(request, response));
    }
    registerProtectedPost(routeTemplate: string, callback: Function): void {
        this._router.post(routeTemplate, this._jwtService.verifyToken(), (request: Request, response: Response, next: Function) =>
            callback(request, response, next));
    }
    registerProtectedPut(routeTemplate: string, callback: Function): void {
        this._router.put(routeTemplate, this._jwtService.verifyToken(), (request: Request, response: Response, next: Function) =>
            callback(request, response, next));
    }
    handleError(err: Error, req: Request, res: Response, next: NextFunction) {
        res.status(500);
        res.send({ error: err });
    }
}