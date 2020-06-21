import axios from "axios";
import { injectable, inject } from "inversify";
import { IWebServer } from "../webserver/IWebServer";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import { workbook } from "../models/workbook";
import { IIntegrationProvider } from "./integrationProvider";
import { ICredentialsProvider, ICredentials, passwordCredentials, patCredentials } from "../credentials/credentialsProvider";
import { tableauCredentialsProvider } from "../credentials/tableau";
import workbookService from "../services/workbookService";
import { TYPES } from "../config/inversify.types";

@injectable()
export class tableauIntegration implements IIntegrationProvider {
    credProvider: ICredentialsProvider;
    name: string;
    private _baseUrl: string;
    private _authToken!: string;
    private _siteId!: string;

    @inject(TYPES.WorkbookService)
    private _workbookService!: workbookService;

    constructor() {
        this.credProvider = new tableauCredentialsProvider();
        this.name = "tableau";
        this._baseUrl = "https://10ax.online.tableau.com";
    }

    register(webServer: IWebServer, route: string) {
        webServer.registerPost(`${route}/${this.name}`, (request: IRequest, response: IResponse) =>
            this.process(request, response)
        );
    }
    async process(request: IRequest, response: IResponse) {
        const creds = this.getCredentials(request.body);
        await this.connect(creds);
        var workbooks = await this.import();
        response.json(workbooks);
    }
    getCredentials(body: any): ICredentials {
        if (body.name && body.password) {
            var passCredentials = new passwordCredentials();
            passCredentials.name = body.name;
            passCredentials.password = body.password;
            return passCredentials
        }
        if (body.personalAccessTokenName && body.personalAccessTokenSecret) {
            let patCreds = new patCredentials();
            patCreds.personalAccessTokenName = body.personalAccessTokenName;
            patCreds.personalAccessTokenSecret = body.personalAccessTokenSecret;
            return patCreds;
        }
        throw new Error("No credentials provided");
    }
    async connect(credentials: ICredentials) {
        const url = `${this._baseUrl}/api/3.8/auth/signin`;
        let requestCredentials: any = {
            credentials: {
                site: {
                    contentUrl: "rupertdev966607"
                }
            }
        };
        for (let [key, value] of Object.entries(credentials.get())) {
            requestCredentials.credentials[key] = value;
        }
        var json = JSON.stringify(requestCredentials);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            var response = await axios.post(url, json, config);
            this._authToken = response.data.credentials.token;
            this._siteId = response.data.credentials.site.id;
        } catch (error) {
            console.error(error);
        }
    }

    async get(): Promise<workbook[]> {
        const url = `${this._baseUrl}/api/3.8/sites/${this._siteId}/workbooks`;
        var response = await axios.get(url, this.getDefaultConfig());
        return response.data.workbooks.workbook.map((w: any) => new workbook(w.id, w.name, w.contentUrl, w.webpageUrl));
    }

    async getById(workbookId: string) {
        const url = `sites/${this._siteId}/workbooks/${workbookId}`;
        var response = await axios.get(url, this.getDefaultConfig());
    }

    async import() {
        const workbooks = await this.get();
        this._workbookService.save(workbooks);
        return workbooks;
    }
    getToken() {
        return this._authToken;
    }
    getDefaultConfig() {
        return {
            headers: {
                'Accept': 'application/json',
                'X-Tableau-Auth': this._authToken
            }
        }
    }
}