"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passwordCredentials = /** @class */ (function () {
    function passwordCredentials() {
    }
    passwordCredentials.prototype.getFields = function () {
        return ["name", "password"];
    };
    passwordCredentials.prototype.get = function () {
        return { name: this.name, password: this.password };
    };
    return passwordCredentials;
}());
exports.passwordCredentials = passwordCredentials;
var patCredentials = /** @class */ (function () {
    function patCredentials() {
    }
    patCredentials.prototype.getFields = function () {
        return ["personalAccessTokenSecret", "personalAccessTokenName"];
    };
    patCredentials.prototype.get = function () {
        return {
            personalAccessTokenName: this.personalAccessTokenName,
            personalAccessTokenSecret: this.personalAccessTokenSecret
        };
    };
    return patCredentials;
}());
exports.patCredentials = patCredentials;
