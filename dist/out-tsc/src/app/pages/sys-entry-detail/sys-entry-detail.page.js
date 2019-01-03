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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
//import {Router} from '@angular/router'
import { Component } from '@angular/core';
import { RService } from 'src/app/services/r.service';
import { ApiClientService } from './../../services/api-client.service';
import { MenuController, NavController } from '@ionic/angular';
var SysEntryDetailPage = /** @class */ (function () {
    function SysEntryDetailPage(menuCtrl, navCtrl, 
    //private router: Router,
    r, apiService) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.r = r;
        this.apiService = apiService;
        this.sysInfo = {
            ApiRootUrl: this.r.ApiRootUrl,
            IsLogin: false,
            BtnLoginText: '登录',
            WelcomeText: ''
        };
        this.apiResult = {
            ResCode: -1,
            Message: ''
        };
    }
    SysEntryDetailPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('SysEntryDetailPage,ngOnInit--');
                        _a = this;
                        return [4 /*yield*/, this.apiService.GetUserInfoAsync()];
                    case 1:
                        _a.userInfo = _b.sent();
                        console.log('UserInfoKey--userInfo:', this.userInfo);
                        this.sysInfo.IsLogin = this.userInfo && this.userInfo.Token.trim() != '';
                        //this.menuCtrl.enable(!this.sysInfo.IsLoginOut);
                        //console.log('this.sysInfo.IsLoginOut:',this.sysInfo.IsLogin);
                        this.sysInfo.BtnLoginText = this.sysInfo.IsLogin ? '退出登录' : '登录';
                        if (this.userInfo) {
                            this.sysInfo.WelcomeText = '欢迎：' + this.userInfo.UserName;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SysEntryDetailPage.prototype.loadData = function () { };
    SysEntryDetailPage.prototype.onApiTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('onApiTest--');
                        if (!this.sysInfo.ApiRootUrl || this.sysInfo.ApiRootUrl.trim() === '') {
                            this.r.alert(null, null, this.r.M_ApiRootUrlInvalidError);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.apiService.apiTest(this.sysInfo.ApiRootUrl)];
                    case 2:
                        res = _a.sent();
                        console.log('apiTest result:', res);
                        if (!res) {
                            this.r.alert(null, null, this.r.M_ApiRootUrlInvalidError);
                        }
                        else {
                            this.r.alert(null, null, this.r.M_Save_Success);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.r.alert(null, null, this.r.M_ApiRootUrlInvalidError);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SysEntryDetailPage.prototype.onSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curr, currApi, currRouter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sysInfo.ApiRootUrl ||
                            this.sysInfo.ApiRootUrl.trim() === '') {
                            this.r.alert(null, null, this.r.M_Form_Field_Empty);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.apiService.setApiRootUrl(this.sysInfo.ApiRootUrl)];
                    case 1:
                        _a.sent();
                        curr = this;
                        currApi = this.apiService;
                        currRouter = this.navCtrl;
                        this.r.alertAndCallback(null, null, this.r.M_Save_Success, function () {
                            if (!curr.sysInfo.IsLogin)
                                currRouter.navigateRoot('/login');
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SysEntryDetailPage.prototype.onDoLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currRouter_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.sysInfo.BtnLoginText == '退出登录')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.apiService.loginOut()];
                    case 1:
                        _a.sent();
                        currRouter_1 = this.navCtrl;
                        this.r.alertAndCallback(null, null, this.r.M_Save_Success, function () {
                            currRouter_1.navigateRoot('/login');
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        this.navCtrl.navigateRoot('/login');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SysEntryDetailPage = __decorate([
        Component({
            selector: 'app-sys-entry-detail',
            templateUrl: './sys-entry-detail.page.html',
            styleUrls: ['./sys-entry-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            NavController,
            RService,
            ApiClientService])
    ], SysEntryDetailPage);
    return SysEntryDetailPage;
}());
export { SysEntryDetailPage };
//# sourceMappingURL=sys-entry-detail.page.js.map