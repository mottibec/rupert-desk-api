import { tableauIntegration } from "../integrations/tableau";
import testWebServer from "./testWebServer";
import { passwordCredentials } from "../credentials/credentialsProvider";

test('tableauIntegration route', () => {
    var webServer = new testWebServer();
    var tableau = new tableauIntegration();
    tableau.register(webServer, "test");
    expect(webServer.getRegistragtion().length).toBe(1);
});

test('tableauIntegration connection', async () => {
    var tableau = new tableauIntegration();
    var cred = new passwordCredentials();
    cred.name = "UNAME";
    cred.password = "PASSWORD";
    await tableau.connect(cred);
    expect(tableau.getToken().length).toBeGreaterThan(0)
});