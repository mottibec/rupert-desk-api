import axios from "axios";
import { injectable } from "inversify";
import { IWebServer } from "../webserver/IWebServer";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import { workbook } from "../models/workbook";

export interface IIntegrationProvider {
    name: string;
    register(webServer: IWebServer, route: string): void;
    import(): Promise<void>;
}

@injectable()
export class tableauIntegration implements IIntegrationProvider {
    name: string = "tableau";
    private _baseUrl: string = "https://10ax.online.tableau.com";
    private _authToken!: string;
    private _siteId!: string;

    register(webServer: IWebServer, route: string) {
        webServer.registerPost(`${route}/${this.name}`, (request: IRequest, response: IResponse) =>
            this.process(request, response)
        );
    }
    async process(request: IRequest, response: IResponse) {
        await this.connect(request.body.username, request.body.password);
        await this.import();
    }
    async connect(username: string, password: string) {
        const url = `${this._baseUrl}/api/3.8/auth/signin`;
        const credentials = {
            "credentials": {
                "name": username,
                "password": password,
                "site": {
                    "contentUrl": "rupertdev966607"
                }
            }
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var response = await axios.post(url, credentials, config);
        this._authToken = response.data.credentials.token;
        this._siteId = response.data.credentials.site.id;
        console.log("enc connect");
    }

    async get() {
        const url = `${this._baseUrl}/api/3.8/sites/${this._siteId}/workbooks`;
        console.log("get() url", url)
        var response = await axios.get(url, this.getDefaultConfig());
        console.log("get() response.data", response.data)
        return response.data.workbooks.workbook.map((w: any) => w as workbook);
    }

    async getById(workbookId: string) {
        const url = `sites/${this._siteId}/workbooks/${workbookId}`;
        var response = await axios.get(url, this.getDefaultConfig());
    }

    async import() {
        console.log("import");
        const workbooks = await this.get();
        console.log("workbooks", workbooks);
        console.log("end import");
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