"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = /** @class */ (function () {
    function App(webServer, controllers) {
        this._webServer = webServer;
        this.configRoutes(controllers);
    }
    App.prototype.configRoutes = function (controllers) {
        controllers.forEach(function (controller) {
            controller.initRoutes();
            console.log("'" + controller.route + "' registered");
        });
    };
    App.prototype.start = function (port) {
        this._webServer.start(port, function () { return "app is listing on port " + port; });
    };
    return App;
}());
exports.default = App;
