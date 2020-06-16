import IController from "./IController";
import { inject, multiInject } from "inversify";
import { TYPES } from "../config/inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import { IIntegrationProvider } from "../services/tableau";
import { IRequest, IResponse } from "../webserver/IWebRequest";

export default class integrationController implements IController {
    route: string = "/integration";

    @inject(TYPES.IWebServer)
    private _webServer!: IWebServer;

    @multiInject(TYPES.IIntegrationProvider)
    private _providers!: IIntegrationProvider[];
    
    initRoutes(): void {
        this._webServer.registerProtectedGet(`${this.route}`, (request: IRequest, response: IResponse) =>
            this.get(request, response));
    }
    async get(request: IRequest, response: IResponse){
        response.json(this._providers.map(p => p.name));
    }

}