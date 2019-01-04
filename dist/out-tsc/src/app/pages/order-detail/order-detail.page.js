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
import { RService } from './../../services/r.service';
import { ApiClientService } from './../../services/api-client.service';
import { Router } from '@angular/router';
import { OrderRequestInfo } from 'src/app/models/OrderRequestInfo';
import { UserInfo } from 'src/app/models/UserInfo';
var OrderDetailPage = /** @class */ (function () {
    function OrderDetailPage(router, r, apiService) {
        this.router = router;
        this.r = r;
        this.apiService = apiService;
        this.userInfo = new UserInfo();
        this.orderInfo = {
            Id: '',
            Barcode: '',
            IsMainOrder: false,
        };
        this.orderInfoSelected = {
            Id: '',
            Barcode: '',
            IsMainOrder: false,
        };
        this.orders = new Array();
    }
    OrderDetailPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ngOnInit--');
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailPage.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //this.userInfo
                        _a = this;
                        return [4 /*yield*/, this.apiService.getData(this.r.OrdersKey)];
                    case 1:
                        //this.userInfo
                        _a.orders = _b.sent();
                        if (!this.orders)
                            this.orders = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailPage.prototype.isExistBarcode = function (barcode) {
        if (!this.orders)
            return false;
        for (var _i = 0, _a = this.orders; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (entity && entity.Barcode === barcode)
                return true;
        }
        return false;
    };
    OrderDetailPage.prototype.onBarcodeChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.barcode ||
                            this.barcode.trim() === '' ||
                            this.isExistBarcode(this.barcode)) {
                            this.barcode = '';
                            return [2 /*return*/];
                        }
                        if (this.orders.length == 0) {
                            this.orderInfoSelected = {
                                Id: this.r.GuidEmpty,
                                Barcode: this.barcode,
                                IsMainOrder: true,
                            };
                        }
                        this.orderInfo = {
                            Id: this.r.GuidEmpty,
                            Barcode: this.barcode,
                            IsMainOrder: this.orders.length == 0,
                        };
                        this.orders.push(this.orderInfo);
                        return [4 /*yield*/, this.apiService.setData(this.r.OrdersKey, this.orders)];
                    case 1:
                        _a.sent();
                        this.barcode = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailPage.prototype.onDelete = function () {
        var curr = this;
        this.r.alertConfirm(null, this.r.M_Delete_Confirm, function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            curr.orders = [];
                            return [4 /*yield*/, curr.apiService.removeData(curr.r.OrdersKey)];
                        case 1:
                            _a.sent();
                            curr.r.alert(null, null, curr.r.M_Save_Success);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    OrderDetailPage.prototype.onCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curr, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('OrderDetailPage,onCommit--');
                        if (this.orders.length < 1) {
                            this.r.alert(null, null, this.r.M_Save_DataEmpty);
                        }
                        if (!this.commitChecked())
                            return [2 /*return*/];
                        curr = this;
                        _b = (_a = this.r).alertConfirm;
                        _c = [null,
                            this.r.M_Commit_Confirm];
                        return [4 /*yield*/, function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var mainOrderInfo, apiResult, _i, _a, entity, orderRequestInfo;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                mainOrderInfo = curr.getMainOrderInfo();
                                                return [4 /*yield*/, curr.apiService.SaveOrderAsync(curr.r.OrdersKey, JSON.stringify(mainOrderInfo))];
                                            case 1:
                                                apiResult = _b.sent();
                                                console.log('apiResult:', apiResult);
                                                if (apiResult.ResCode != 1000) {
                                                    curr.r.alert(null, null, apiResult.Message);
                                                    return [2 /*return*/];
                                                }
                                                _i = 0, _a = curr.orders;
                                                _b.label = 2;
                                            case 2:
                                                if (!(_i < _a.length)) return [3 /*break*/, 5];
                                                entity = _a[_i];
                                                if (!(entity && !entity.IsMainOrder)) return [3 /*break*/, 4];
                                                orderRequestInfo = new OrderRequestInfo();
                                                orderRequestInfo.OrderCode = entity.Barcode;
                                                orderRequestInfo.ParentOrderCode = mainOrderInfo.OrderCode;
                                                return [4 /*yield*/, curr.apiService.SaveOrderAsync(curr.r.OrdersKey, JSON.stringify(orderRequestInfo))];
                                            case 3:
                                                apiResult = _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                _i++;
                                                return [3 /*break*/, 2];
                                            case 5: return [4 /*yield*/, curr.clearData()];
                                            case 6:
                                                _b.sent();
                                                curr.r.alert(null, null, curr.r.M_Save_Success);
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailPage.prototype.commitChecked = function () {
        if (!this.orders)
            return false;
        var mainOrderNum = 0;
        var curr = this;
        for (var _i = 0, _a = curr.orders; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (entity && entity.IsMainOrder) {
                mainOrderNum++;
            }
        }
        if (mainOrderNum !== 1) {
            this.r.alert(null, null, this.r.M_Order_ExistOne);
            return false;
        }
        return true;
    };
    OrderDetailPage.prototype.getMainOrderInfo = function () {
        for (var _i = 0, _a = this.orders; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (entity && entity.IsMainOrder) {
                var orderRequestInfo = new OrderRequestInfo();
                orderRequestInfo.OrderCode = entity.Barcode;
                orderRequestInfo.ParentOrderCode = '';
                return orderRequestInfo;
            }
        }
        return null;
    };
    OrderDetailPage.prototype.clearData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.removeData(this.r.OrdersKey)];
                    case 1:
                        _a.sent();
                        this.orders = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailPage = __decorate([
        Component({
            selector: 'app-orderDetail',
            templateUrl: './order-detail.page.html',
            styleUrls: ['./order-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            RService,
            ApiClientService])
    ], OrderDetailPage);
    return OrderDetailPage;
}());
export { OrderDetailPage };
//# sourceMappingURL=order-detail.page.js.map