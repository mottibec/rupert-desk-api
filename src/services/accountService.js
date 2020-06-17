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
var inversify_types_1 = require("../config/inversify.types");
var inversify_1 = require("inversify");
var AccountRepository_1 = require("../database/AccountRepository");
var AccountService = /** @class */ (function () {
    function AccountService() {
    }
    AccountService.prototype.findByEmail = function (email) {
        return this._accountRepository.findOne({ 'email': email });
    };
    AccountService.prototype.getAccount = function (id) {
        return this._accountRepository.findOne({ 'id': id });
    };
    AccountService.prototype.createAccount = function (account) {
        return this._accountRepository.create(account);
    };
    AccountService.prototype.getAllAccounts = function () {
        return this._accountRepository.find({});
    };
    AccountService.prototype.update = function (account) {
        return this._accountRepository.update(account);
    };
    var _a;
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.AccountRepository),
        __metadata("design:type", typeof (_a = typeof AccountRepository_1.AccountRepository !== "undefined" && AccountRepository_1.AccountRepository) === "function" ? _a : Object)
    ], AccountService.prototype, "_accountRepository", void 0);
    AccountService = __decorate([
        inversify_1.injectable()
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;