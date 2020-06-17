"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var credentialsProvider_1 = require("./credentialsProvider");
var tableauCredentialsProvider = /** @class */ (function () {
    function tableauCredentialsProvider() {
    }
    tableauCredentialsProvider.prototype.getCredentials = function () {
        return [
            new credentialsProvider_1.passwordCredentials(),
            new credentialsProvider_1.patCredentials()
        ];
    };
    return tableauCredentialsProvider;
}());
exports.tableauCredentialsProvider = tableauCredentialsProvider;
