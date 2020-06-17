import { IWebServer } from "../webserver/IWebServer";

export default class testWebServer implements IWebServer {
    private _registragtion!: any[];

    getRegistragtion() {
        return this._registragtion;
    }
    registerGet(routeTemplate: string, callback: Function): void {
        this._registragtion.push({ routeTemplate, callback })
    }
    registerPost(routeTemplate: string, callback: Function): void {
        this._registragtion.push({ routeTemplate, callback })
    }
    registerProtectedGet(routeTemplate: string, callback: Function): void {
        throw new Error("Method not implemented.");
    }
    registerProtectedPost(routeTemplate: string, callback: Function): void {
        throw new Error("Method not implemented.");
    }
    registerProtectedPut(routeTemplate: string, callback: Function): void {
        throw new Error("Method not implemented.");
    }
    start(port: number, callback: () => void): void {
        callback();
    }

}