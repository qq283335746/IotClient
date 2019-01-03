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
import { Router } from '@angular/router';
import { ApiClientService } from './../../services/api-client.service';
import { Component } from '@angular/core';
import { RService } from 'src/app/services/r.service';
import { OrderRequestInfo } from 'src/app/models/OrderRequestInfo';
var OrderPackageDetailPage = /** @class */ (function () {
    function OrderPackageDetailPage(router, apiService, r) {
        this.router = router;
        this.apiService = apiService;
        this.r = r;
        this.orderPackageInfo = {
            ParentOrder: this.r.getRndOrderCode(),
            Orders: [],
        };
    }
    OrderPackageDetailPage.prototype.ngOnInit = function () {
        this.loadData();
    };
    OrderPackageDetailPage.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldOrderPackageInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.getData(this.r.OrderPackagesKey)];
                    case 1:
                        oldOrderPackageInfo = _a.sent();
                        if (oldOrderPackageInfo)
                            this.orderPackageInfo = oldOrderPackageInfo;
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderPackageDetailPage.prototype.isExistBarcode = function (barcode) {
        if (!this.orderPackageInfo.Orders ||
            this.orderPackageInfo.Orders.length == 0)
            return false;
        for (var _i = 0, _a = this.orderPackageInfo.Orders; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (entity && entity.Barcode === barcode)
                return true;
        }
        return false;
    };
    OrderPackageDetailPage.prototype.onBarcodeChanged = function () {
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
                        this.orderInfo = {
                            Id: this.r.GuidEmpty,
                            Barcode: this.barcode,
                            IsMainOrder: false,
                        };
                        this.orderPackageInfo.Orders.push(this.orderInfo);
                        return [4 /*yield*/, this.apiService.setData(this.r.OrderPackagesKey, this.orderPackageInfo)];
                    case 1:
                        _a.sent();
                        this.barcode = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderPackageDetailPage.prototype.onDelete = function () {
        var curr = this;
        this.r.alertConfirm(null, this.r.M_Delete_Confirm, function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, curr.apiService.removeData(curr.r.OrderPackagesKey)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, curr.clearData()];
                        case 2:
                            _a.sent();
                            curr.r.alert(null, null, curr.r.M_Save_Success);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    OrderPackageDetailPage.prototype.onCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curr, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        curr = this;
                        _b = (_a = this.r).alertConfirm;
                        _c = [null,
                            this.r.M_Commit_Confirm];
                        return [4 /*yield*/, function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var isOk;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, curr.saveToServer()];
                                            case 1:
                                                isOk = _a.sent();
                                                if (!isOk)
                                                    return [2 /*return*/];
                                                return [4 /*yield*/, curr.clearData()];
                                            case 2:
                                                _a.sent();
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
    OrderPackageDetailPage.prototype.saveToServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainOrderInfo, apiResult, _i, _a, entity, orderRequestInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mainOrderInfo = new OrderRequestInfo();
                        mainOrderInfo.OrderCode = this.orderPackageInfo.ParentOrder;
                        mainOrderInfo.ParentOrderCode = '';
                        return [4 /*yield*/, this.apiService.SaveOrderAsync(this.r.OrderPackagesKey, JSON.stringify(mainOrderInfo))];
                    case 1:
                        apiResult = _b.sent();
                        console.log('apiResult:', apiResult);
                        if (apiResult.ResCode != 1000) {
                            this.r.alert(null, null, apiResult.Message);
                            return [2 /*return*/, false];
                        }
                        _i = 0, _a = this.orderPackageInfo.Orders;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        entity = _a[_i];
                        orderRequestInfo = new OrderRequestInfo();
                        orderRequestInfo.OrderCode = entity.Barcode;
                        orderRequestInfo.ParentOrderCode = this.orderPackageInfo.ParentOrder;
                        return [4 /*yield*/, this.apiService.SaveOrderAsync(this.r.OrderPackagesKey, JSON.stringify(orderRequestInfo))];
                    case 3:
                        apiResult = _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, true];
                }
            });
        });
    };
    OrderPackageDetailPage.prototype.clearData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.removeData(this.r.OrderPackagesKey)];
                    case 1:
                        _a.sent();
                        this.orderPackageInfo = {
                            ParentOrder: this.r.getRndOrderCode(),
                            Orders: [],
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderPackageDetailPage = __decorate([
        Component({
            selector: 'app-order-package-detail',
            templateUrl: './order-package-detail.page.html',
            styleUrls: ['./order-package-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            ApiClientService,
            RService])
    ], OrderPackageDetailPage);
    return OrderPackageDetailPage;
}());
export { OrderPackageDetailPage };
//# sourceMappingURL=order-package-detail.page.js.map