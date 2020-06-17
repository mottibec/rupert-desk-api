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
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var inversify_1 = require("inversify");
var jwtService_1 = __importDefault(require("./jwtService"));
var inversify_types_1 = require("../config/inversify.types");
var passwordHashService_1 = __importDefault(require("./passwordHashService"));
var userService_1 = require("./userService");
var LocalAuthProvider = /** @class */ (function () {
    function LocalAuthProvider() {
    }
    LocalAuthProvider.prototype.register = function (webServer, route) {
        var _this = this;
        passport_1.default.use(new passport_local_1.Strategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        }, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.verifyAccount.apply(this, args)];
            }); });
        }));
        webServer.registerPost(route + "/login", function (request, response, next) {
            return passport_1.default.authenticate("local", { session: false }, function (err, user, info) {
                if (err || !user) {
                    return response
                        .status(400)
                        .json({
                        error: err,
                        user: user,
                        info: info
                    });
                }
                var token = _this._jwtService.sign(user);
                return response.json({ username: user.name, access_token: token });
            })(request, response, next);
        });
        this._jwtService.register();
    };
    LocalAuthProvider.prototype.verifyAccount = function (userName, password, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var user, doseMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userService.findByEmail(userName)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, callback(null, false, "invalid user name or password")];
                        }
                        return [4 /*yield*/, this._passwordHash.verifyHash(password, user.password || "")];
                    case 2:
                        doseMatch = _a.sent();
                        if (!doseMatch) {
                            return [2 /*return*/, callback(null, false, "invalid user name or password")];
                        }
                        return [2 /*return*/, callback(null, { email: user.email, name: user.name })];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.JWTService),
        __metadata("design:type", jwtService_1.default)
    ], LocalAuthProvider.prototype, "_jwtService", void 0);
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.UserService),
        __metadata("design:type", userService_1.userService)
    ], LocalAuthProvider.prototype, "_userService", void 0);
    __decorate([
        inversify_1.inject(inversify_types_1.TYPES.AuthService),
        __metadata("design:type", passwordHashService_1.default)
    ], LocalAuthProvider.prototype, "_passwordHash", void 0);
    LocalAuthProvider = __decorate([
        inversify_1.injectable()
    ], LocalAuthProvider);
    return LocalAuthProvider;
}());
exports.LocalAuthProvider = LocalAuthProvider;
