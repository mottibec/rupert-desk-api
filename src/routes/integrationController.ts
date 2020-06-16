import IController from "./IController";
import { inject, multiInject, injectable } from "inversify";
import { TYPES } from "../config/inversify.types";
import { IWebServer } from "../webserver/IWebServer";
import { IIntegrationProvider } from "../services/tableau";
import { IRequest, IResponse } from "../webserver/IWebRequest";

@injectable()
export default class integrationController implements IController {
    route: string = "/integration";

    @inject(TYPES.IWebServer)
    private _webServer!: IWebServer;

    @multiInject(TYPES.IIntegrationProvider)
    private _providers!: IIntegrationProvider[];

    initRoutes(): void {
        this._providers.forEach(provider => provider.register(this._webServer, this.route));
        this._webServer.registerGet(`${this.route}`, (request: IRequest, response: IResponse) =>
            this.get(request, response));
    }
    async get(request: IRequest, response: IResponse) {
        console.log(this._providers);
        const integrations = this._providers.map(p => ({
            name: p.name,
            url: `${this.route}/${p.name}`
        }));
        console.log(integrations);
        return response.json(integrations);
    }

    async import(request: IRequest, response: IResponse) {
        const integrationProviderName = request.body.name;
        const integration = this._providers.find(p => p.name == integrationProviderName);
        await integration?.import();
    }

}