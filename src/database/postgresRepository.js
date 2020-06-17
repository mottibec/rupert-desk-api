"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var config_1 = __importDefault(require("../config/config"));
var inversify_1 = require("inversify");
var postgresRepository = /** @class */ (function () {
    function postgresRepository() {
        this.knex = knex_1.default({
            client: 'pg',
            connection: config_1.default.databaseConnectionString,
            searchPath: ['knex', 'public'],
        });
    }
    postgresRepository.prototype.create = function (item) {
        try {
            var result = this.knex("workbook").insert(item);
            return result != null;
        }
        catch (error) {
            console.log("error", error);
            return false;
        }
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
    postgresRepository = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], postgresRepository);
    return postgresRepository;
}());
exports.postgresRepository = postgresRepository;
