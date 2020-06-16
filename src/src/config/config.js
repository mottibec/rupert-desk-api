"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: +(process.env["PORT"] || 4000),
    rootServiceUrl: "http://localhost:4000/",
    jwtSecret: process.env["jwtSecret"] || "rupertappsupersecret",
    databaseConnectionString: process.env.PG_CONNECTION_STRING || "test"
};
