import { IWebServer } from "../webserver/IWebServer";
import { ICredentialsProvider } from "../credentials/credentialsProvider";

export interface IIntegrationProvider {
    name: string;
    register(webServer: IWebServer, route: string): void;
    import(): Promise<void>;
    credProvider: ICredentialsProvider;
}