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
var memoryRepository = /** @class */ (function () {
    function memoryRepository() {
        this.items = [];
    }
    memoryRepository.prototype.find = function (query) {
        return Promise.resolve(this.items);
    };
    memoryRepository.prototype.create = function (item) {
        console.log(item);
        this.items.push(item);
        return Promise.resolve(true);
    };
    memoryRepository.prototype.findById = function (id) {
        var item = this.items[0];
        return Promise.resolve(item);
    };
    memoryRepository = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], memoryRepository);
    return memoryRepository;
}());
exports.memoryRepository = memoryRepository;
