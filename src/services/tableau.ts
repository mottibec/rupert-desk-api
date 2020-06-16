import axios from "axios";
import { injectable } from "inversify";

export interface IIntegrationProvider {
    name: string;
    import(): Promise<void>;
}

@injectable()
export class tableauIntegration implements IIntegrationProvider {
    name: string = "tableau";
    private _baseUrl!: string;
    private _authToken!: string;
    private _siteId!: string;

    async connect(userName: string, password: string) {
        const url = `${this._baseUrl}/api/api-version/auth/signin`;
        const credentials = {
            "credentials": {
                "name": userName,
                "password": password
            }
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var response = await axios.post(url, credentials, config);
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