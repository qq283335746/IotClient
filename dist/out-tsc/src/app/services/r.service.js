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
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
var RService = /** @class */ (function () {
    function RService(alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.RolesOptions = ['OrderPackage'];
        this.AppId = "100000";
        this.AppSecret = "Tu9vwcJ9Co/nLtOAJ+B87g==";
        this.DeviceId = '';
        this.ApiRootUrlKey = 'ApiRootUrl';
        this.Api_Hello = '/Services/PdaService.svc/GetHelloWord';
        this.Api_Login = this.ApiRootUrl + '/Login';
        this.OrdersKey = 'Orders';
        this.OrderPackagesKey = 'OrderPackages';
        this.UserInfoKey = 'UserInfo';
        this.GuidEmpty = '00000000-0000-0000-0000-000000000000';
        this.M_Save_Success = '恭喜您，操作成功！';
        this.M_Save_DataEmpty = '无任何可提交的数据！';
        this.M_ApiRootUrlInvalidError = '请正确输入接口地址！';
        this.M_Form_Field_Empty = '带有“*”符号的为必须项，请检查';
        this.M_Delete_Confirm = '确定要删除操作吗？';
        this.M_Commit_Confirm = '确定要提交吗？';
        this.M_Order_ExistOne = '必须设置一个且仅一个订单号作为主订单';
        this.M_Login_InvalidError = '帐号或密码不正确！';
        this.M_NotLogin = '请先登录！';
        console.log('RService.constructor--');
    }
    RService.prototype.alert = function (title, subTitle, message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!title || title.trim() === '')
                            title = '提示';
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: title,
                                subHeader: subTitle,
                                message: message,
                                buttons: ['确定'],
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RService.prototype.alertAndCallback = function (title, subTitle, message, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!title || title.trim() === '')
                            title = '提示';
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: title,
                                subHeader: subTitle,
                                message: message,
                                buttons: [
                                    {
                                        text: '确定',
                                        handler: function () {
                                            callback();
                                        },
                                    },
                                ],
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RService.prototype.alertConfirm = function (title, message, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: title,
                            message: message,
                            buttons: [
                                {
                                    text: '取消',
                                    role: 'cancel',
                                    //cssClass: 'secondary',
                                    handler: function (blah) {
                                        //console.log('Confirm Cancel: blah')
                                    },
                                },
                                {
                                    text: '确定',
                                    handler: function () {
                                        callback();
                                    },
                                },
                            ],
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RService.prototype.findIndex = function (array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._Id < id ? (low = mid + 1) : (high = mid);
        }
        return low;
    };
    RService.prototype.getRndOrderCode = function () {
        var date = new Date();
        return (date.getFullYear().toString() +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            date
                .getDate()
                .toString()
                .padStart(2, '0') +
            date
                .getHours()
                .toString()
                .padStart(2, '0') +
            date
                .getMinutes()
                .toString()
                .padStart(2, '0') +
            date
                .getSeconds()
                .toString()
                .padStart(2, '0') +
            this.getRndCode(11, 99).toString());
    };
    RService.prototype.getRndCode = function (min, max) {
        var range = max - min;
        var rand = Math.random();
        return min + Math.round(rand * range);
    };
    RService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [AlertController])
    ], RService);
    return RService;
}());
export { RService };
//# sourceMappingURL=r.service.js.map