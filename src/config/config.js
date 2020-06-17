"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: +(process.env["PORT"] || 4000),
    rootServiceUrl: "http://localhost:4000/",
    jwtSecret: process.env["jwtSecret"] || "rupertappsupersecret",
    databaseConnectionString: process.env.DATABASE_URL || "postgres://ctihygwhfwfjac:faa13f657daf21b8eff9e9f647c4b133317594419675a8344a5011dee9902643@ec2-34-197-141-7.compute-1.amazonaws.com:5432/d9glgveugdqd3d"
};
