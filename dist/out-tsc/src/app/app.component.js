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
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import {Router} from '@angular/router'
import { RService } from './services/r.service';
import { ApiClientService } from './services/api-client.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, navCtrl, 
    //private router: Router,
    r, apiService) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.r = r;
        this.apiService = apiService;
        this.appPages = [
            // {
            //   title: '首页',
            //   url: '/home',
            //   icon: 'home',
            // },
            {
                title: '订单扫描',
                url: '/orderDetail',
                icon: 'qr-scanner',
            },
            {
                title: '订单包装',
                url: '/orderPackageDetail',
                icon: 'rose',
            },
            {
                title: '订单查询',
                url: '/findOrder',
                icon: 'search',
            },
            {
                title: '系统设置',
                url: '/sysEntryDetail',
                icon: 'build',
            },
        ];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () { return __awaiter(_this, void 0, void 0, function () {
            var apiRootUrl, userInfo, userInfo_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusBar.styleDefault();
                        this.splashScreen.hide();
                        return [4 /*yield*/, this.apiService.getData(this.r.ApiRootUrlKey)];
                    case 1:
                        apiRootUrl = _a.sent();
                        return [4 /*yield*/, this.apiService.getData(this.r.UserInfoKey)];
                    case 2:
                        userInfo = _a.sent();
                        console.log('UserInfoKey--userInfo:', userInfo);
                        if (!(!apiRootUrl || apiRootUrl === '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.navCtrl.navigateRoot('/sysEntryDetail')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(!userInfo || userInfo.UserName == '')) return [3 /*break*/, 6];
                        console.log('is not login--');
                        return [4 /*yield*/, this.navCtrl.navigateRoot('/login')];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.apiService.getData(this.r.UserInfoKey)];
                    case 7:
                        userInfo_1 = _a.sent();
                        if (userInfo_1.RoleName === this.r.RolesOptions[0]) {
                            this.navCtrl.navigateForward('/orderPackageDetail');
                        }
                        else {
                            this.navCtrl.navigateForward('/orderDetail');
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            NavController,
            RService,
            ApiClientService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map