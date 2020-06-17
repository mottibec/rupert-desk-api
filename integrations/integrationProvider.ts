import { IWebServer } from "../webserver/IWebServer";
import { ICredentialsProvider } from "../credentials/credentialsProvider";
import { workbook } from "../models/workbook";

export interface IIntegrationProvider {
    name: string;
    register(webServer: IWebServer, route: string): void;
    import(): Promise<workbook[]>;
    credProvider: ICredentialsProvider;
}