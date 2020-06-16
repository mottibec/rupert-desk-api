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
var UserRepository_1 = require("../database/UserRepository");
var inversify_types_1 = require("../inversify.types");
var inversify_1 = require("inversify");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.findByEmail = function (email) {
        return this._userRepository.findOne({ 'email': email });
    };
    UserService.prototype.getUser = function (id) {
        return this._userRepository.findOne({ 'id': id });
    };
    UserService.prototype.createUser = function (user) {
        return this._userRepository.create(user);
    };
    UserService.prototype.getAllUsers = function () {
        return this._userRepository.find({});
    };
    UserService.prototype.update = function (user) {
        return this._userRepository.update(user);
    };
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.UserRepository),
        __metadata("design:type", UserRepository_1.UserRepository)
    ], UserService.prototype, "_userRepository", void 0);
    UserService = __decorate([
        inversify_1.injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
