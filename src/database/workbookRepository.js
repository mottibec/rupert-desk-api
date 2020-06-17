"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var memoryRepository_1 = require("./memoryRepository");
var workbookRepository = /** @class */ (function (_super) {
    __extends(workbookRepository, _super);
    function workbookRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    workbookRepository.prototype.save = function (workbooks) {
        var _this = this;
        var isAllSuccsess = workbooks.map(function (workbook) { return _this.create(workbook); });
    };
    workbookRepository.prototype.getAll = function () {
        var workbooks = this.items;
        console.log("workbooks", workbooks);
        return Promise.resolve(workbooks);
    };
    workbookRepository.prototype.findByString = function (query) {
        var words = query.split(' ');
        console.log("words", words);
        var result = this.items.filter(function (item) {
            for (var _i = 0, _a = Object.entries(item); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                console.log("value", value);
                if (words.indexOf(value) != -1) {
                    return true;
                }
            }
        });
        return Promise.resolve(result);
    };
    workbookRepository = __decorate([
        inversify_1.injectable()
    ], workbookRepository);
    return workbookRepository;
}(memoryRepository_1.memoryRepository));
exports.workbookRepository = workbookRepository;
