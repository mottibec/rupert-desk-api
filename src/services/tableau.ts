import axios from "axios";
import { injectable } from "inversify";
import { IWebServer } from "../webserver/IWebServer";
import { IRequest, IResponse } from "../webserver/IWebRequest";

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
            this.connect(request.body.username, request.body.password));
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
        console.log("url", url);
        console.log("credentials", credentials);
        console.log("config", config);
        var response = await axios.post(url, credentials, config);
        console.log("response.data", response.data);
        this._authToken = response.data.credentials.token;
        const site = response.data.credentials.site;
        const userId = response.data.credentials.user.id;

    }

    async get() {
        const url = `sites/${this._siteId}/workbooks`;
        var response = await axios.get(url, this.getDefaultConfig());
    }

    async getById(workbookId: string) {
        const url = `sites/${this._siteId}/workbooks/${workbookId}`;
        var response = await axios.get(url, this.getDefaultConfig());
    }

    async import() {
        const workbookIds: string[] = ["test"];
        var ids = await Promise.all(workbookIds.map(id => this.getById(id)));
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