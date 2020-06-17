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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var inversify_1 = require("inversify");
var passwordCredentials = /** @class */ (function () {
    function passwordCredentials() {
    }
    passwordCredentials.prototype.getFields = function () {
        return ["name", "password"];
    };
    passwordCredentials.prototype.get = function () {
        return { name: this.name, password: this.password };
    };
    return passwordCredentials;
}());
var patCredentials = /** @class */ (function () {
    function patCredentials() {
    }
    patCredentials.prototype.getFields = function () {
        return ["pat"];
    };
    patCredentials.prototype.get = function () {
        return { pat: this.pat };
    };
    return patCredentials;
}());
var tableauCredentialsProvider = /** @class */ (function () {
    function tableauCredentialsProvider() {
    }
    tableauCredentialsProvider.prototype.getCredentials = function () {
        return [
            new passwordCredentials(),
            new patCredentials()
        ];
    };
    return tableauCredentialsProvider;
}());
var tableauIntegration = /** @class */ (function () {
    function tableauIntegration() {
        this.credProvider = new tableauCredentialsProvider();
        this.name = "tableau";
        this._baseUrl = "https://10ax.online.tableau.com";
    }
    tableauIntegration.prototype.register = function (webServer, route) {
        var _this = this;
        webServer.registerPost(route + "/" + this.name, function (request, response) {
            return _this.process(request, response);
        });
    };
    tableauIntegration.prototype.process = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var creds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        creds = this.getCredentials(request.body);
                        return [4 /*yield*/, this.connect(creds)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.import()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tableauIntegration.prototype.getCredentials = function (body) {
        if (body.username && body.password) {
            var passCredentials = new passwordCredentials();
            passCredentials.name = body.username;
            passCredentials.password = body.password;
            console.log("passCredentials", passCredentials);
            return passCredentials;
        }
        var patCreds = new patCredentials();
        patCreds.pat = body.pat;
        return patCreds;
    };
    tableauIntegration.prototype.connect = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var url, requestCredentials, _i, _a, _b, key, value, json, config, response, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this._baseUrl + "/api/3.8/auth/signin";
                        requestCredentials = {
                            credentials: {
                                site: {
                                    contentUrl: "rupertdev966607"
                                }
                            }
                        };
                        for (_i = 0, _a = Object.entries(credentials.get()); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            requestCredentials.credentials[key] = value;
                        }
                        json = JSON.stringify(requestCredentials);
                        console.log("json", json);
                        config = {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post(url, json, config)];
                    case 2:
                        response = _c.sent();
                        console.log("response.data", response.data);
                        this._authToken = response.data.credentials.token;
                        this._siteId = response.data.credentials.site.id;
                        console.log("response.data.credentials", response.data.credentials);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tableauIntegration.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._baseUrl + "/api/3.8/sites/" + this._siteId + "/workbooks";
                        return [4 /*yield*/, axios_1.default.get(url, this.getDefaultConfig())];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.workbooks.workbook.map(function (w) { return w; })];
                }
            });
        });
    };
    tableauIntegration.prototype.getById = function (workbookId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "sites/" + this._siteId + "/workbooks/" + workbookId;
                        return [4 /*yield*/, axios_1.default.get(url, this.getDefaultConfig())];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tableauIntegration.prototype.import = function () {
        return __awaiter(this, void 0, void 0, function () {
            var workbooks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get()];
                    case 1:
                        workbooks = _a.sent();
                        console.log("workbooks", workbooks);
                        return [2 /*return*/];
                }
            });
        });
    };
    tableauIntegration.prototype.getDefaultConfig = function () {
        return {
            headers: {
                'Accept': 'application/json',
                'X-Tableau-Auth': this._authToken
            }
        };
    };
    tableauIntegration = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], tableauIntegration);
    return tableauIntegration;
}());
exports.tableauIntegration = tableauIntegration;
