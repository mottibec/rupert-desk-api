import axios from "axios";
import { injectable } from "inversify";
import { IWebServer } from "../webserver/IWebServer";
import { IRequest, IResponse } from "../webserver/IWebRequest";
import { workbook } from "../models/workbook";

export interface ICredentials {
    getFields(): any;
    get(): any;
}

class passwordCredentials implements ICredentials {
    public name!: string;
    public password!: string;
    getFields() {
        return ["name", "password"];
    }
    get() {
        return { name: this.name, password: this.password }
    }

}

class patCredentials implements ICredentials {
    public personalAccessTokenSecret!: string;
    public personalAccessTokenName!: string
    getFields() {
        return ["personalAccessTokenSecret", "personalAccessTokenName"];
    }
    get() {
        return {
            personalAccessTokenName: this.personalAccessTokenName,
            personalAccessTokenSecret: this.personalAccessTokenSecret
        }
    }
}

export interface ICredentialsProvider {
    getCredentials(): ICredentials[];
}

class tableauCredentialsProvider implements ICredentialsProvider {
    getCredentials(): ICredentials[] {
        return [
            new passwordCredentials(),
            new patCredentials()
        ]
    }

}

export interface IIntegrationProvider {
    name: string;
    register(webServer: IWebServer, route: string): void;
    import(): Promise<void>;
    credProvider: ICredentialsProvider;
}

@injectable()
export class tableauIntegration implements IIntegrationProvider {
    credProvider: ICredentialsProvider;
    name: string;
    private _baseUrl: string;
    private _authToken!: string;
    private _siteId!: string;

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
        await this.import();
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
        return response.data.workbooks.workbook.map((w: any) => w as workbook);
    }

    async getById(workbookId: string) {
        const url = `sites/${this._siteId}/workbooks/${workbookId}`;
        var response = await axios.get(url, this.getDefaultConfig());
    }

    async import() {
        const workbooks = await this.get();
        console.log("workbooks", workbooks);
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