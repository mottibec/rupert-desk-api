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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var workbookRepository_1 = require("../database/workbookRepository");
var inversify_types_1 = require("../config/inversify.types");
var woorkbookService = /** @class */ (function () {
    function woorkbookService() {
    }
    woorkbookService.prototype.get = function (id) {
        return this._workbookRepo.findById(id);
    };
    woorkbookService.prototype.getAll = function () {
        return this._workbookRepo.getAll();
    };
    woorkbookService.prototype.search = function (query) {
        return this._workbookRepo.findByString(query);
    };
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.WorkbookRepository),
        __metadata("design:type", workbookRepository_1.workbookRepository)
    ], woorkbookService.prototype, "_workbookRepo", void 0);
    woorkbookService = __decorate([
        inversify_1.injectable()
    ], woorkbookService);
    return woorkbookService;
}());
exports.default = woorkbookService;
