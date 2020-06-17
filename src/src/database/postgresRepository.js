"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var config_1 = __importDefault(require("../config/config"));
var postgresRepository = /** @class */ (function () {
    function postgresRepository() {
        this._knex = knex_1.default({
            client: 'pg',
            connection: config_1.default.databaseConnectionString,
            searchPath: ['knex', 'public'],
        });
    }
    postgresRepository.prototype.create = function (item) {
        var result = this._knex("table").insert(item);
        return result != null;
    };
    postgresRepository.prototype.update = function (item) {
        throw new Error("Method not implemented.");
    };
    postgresRepository.prototype.find = function (query) {
        throw new Error("Method not implemented.");
    };
    postgresRepository.prototype.findOne = function (query) {
        throw new Error("Method not implemented.");
    };
    postgresRepository.prototype.findById = function (id) {
        throw new Error("Method not implemented.");
    };
    postgresRepository.prototype.getAll = function () {
    };
    return postgresRepository;
}());
exports.postgresRepository = postgresRepository;
