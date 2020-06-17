"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testWebServer = /** @class */ (function () {
    function testWebServer() {
    }
    testWebServer.prototype.getRegistragtion = function () {
        return this._registragtion;
    };
    testWebServer.prototype.registerGet = function (routeTemplate, callback) {
        this._registragtion.push({ routeTemplate: routeTemplate, callback: callback });
    };
    testWebServer.prototype.registerPost = function (routeTemplate, callback) {
        this._registragtion.push({ routeTemplate: routeTemplate, callback: callback });
    };
    testWebServer.prototype.registerProtectedGet = function (routeTemplate, callback) {
        throw new Error("Method not implemented.");
    };
    testWebServer.prototype.registerProtectedPost = function (routeTemplate, callback) {
        throw new Error("Method not implemented.");
    };
    testWebServer.prototype.registerProtectedPut = function (routeTemplate, callback) {
        throw new Error("Method not implemented.");
    };
    testWebServer.prototype.start = function (port, callback) {
        callback();
    };
    return testWebServer;
}());
exports.default = testWebServer;
