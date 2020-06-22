import IController from "./controller";
import { inject, injectable } from "inversify";
import { IWebServer } from "../webserver/IWebServer";
import { TYPES } from "../config/inversify.types";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import workbookService from "../services/workbookService";

@injectable()
export class workbookController implements IController {
    route: string = "/workbook";

    @inject(TYPES.IWebServer)
    private _webServer!: IWebServer;

    @inject(TYPES.WorkbookService)
    private _workbookService!: workbookService;

    initRoutes(): void {
        this._webServer.registerProtectedGet(this.route, (request: IRequest, response: IResponse) =>
            this.get(request, response));

        this._webServer.registerProtectedGet(`${this.route}/:id`, (request: IRequest, response: IResponse) =>
            this.getById(request, response));

        this._webServer.registerProtectedPost(`${this.route}/query`, (request: IRequest, response: IResponse) =>
            this.find(request, response));
    }
    async getById(request: IRequest, response: IResponse) {
        console.log(request.params);
        const id = request.params.id;
        const workbooks = await this._workbookService.get(id);
        response.json(workbooks);
    }
    async get(request: IRequest, response: IResponse) {
        const workbooks = await this._workbookService.getAll();
        console.log("workbooks", workbooks);
        response.json(workbooks);
    }
    async find(request: IRequest, response: IResponse) {
        const query = request.body.query;
        const workbooks = await this._workbookService.search(query);
        response.json(workbooks);
    }

}