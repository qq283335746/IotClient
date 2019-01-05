import { Component, OnInit } from '@angular/core'
import { RService } from './../../services/r.service'
import { ApiClientService } from './../../services/api-client.service'
import { OrderInfo } from '../../models/OrderInfo'
import { Router } from '@angular/router';
import { OrderRequestInfo } from 'src/app/models/OrderRequestInfo';
import { UserInfo } from 'src/app/models/UserInfo';

@Component({
  selector: 'app-orderDetail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  constructor(
    private router: Router,
    private r: RService,
    private apiService: ApiClientService
  ) {
    this.orders = new Array<OrderInfo>()
  }

  userInfo = new UserInfo();
  orderInfo = new OrderInfo();
  orderInfoSelected = new OrderInfo();

  barcode: string;
  orders: Array<OrderInfo>;
  isMainOrder: boolean;
  remark: string;
  batchRandomCode: string = this.r.getRndOrderCode();

  async ngOnInit() {
    console.log('ngOnInit--');

    await this.loadData();
  }

  async loadData(): Promise<void> {
    //this.userInfo
    this.orders = await this.apiService.getData(this.r.OrdersKey)
    if (!this.orders || this.orders.length == 0) this.orders = []
    else {
      this.batchRandomCode = this.orders[0].BatchRandomCode;
    }
    console.log('batchRandomCode:', this.batchRandomCode);
  }

  isExistBarcode(barcode: string): boolean {
    if (!this.orders) return false

    for (let entity of this.orders) {
      if (entity && entity.Barcode === barcode) return true
    }

    return false
  }

  async onBarcodeChanged(): Promise<void> {
    if (
      !this.barcode ||
      this.barcode.trim() === '' ||
      this.isExistBarcode(this.barcode)
    ) {
      this.resetScan();
      return
    }

    if (this.orders.length == 0) {
      this.orderInfoSelected.Id = this.r.GuidEmpty;
      this.orderInfoSelected.Barcode = this.barcode;
      this.isMainOrder = true;
    }

    let orderInfo = new OrderInfo();
    orderInfo.Id = this.r.GuidEmpty;
    orderInfo.Barcode = this.barcode;
    orderInfo.IsMainOrder = this.orders.length == 0;
    orderInfo.BatchRandomCode = this.batchRandomCode;

    this.orders.push(orderInfo)
    await this.apiService.setData(this.r.OrdersKey, this.orders)

    this.resetScan();
  }

  onDelete(): void {
    let curr = this
    this.r.alertConfirm(null, this.r.M_Delete_Confirm, async function () {
      curr.orders = []
      await curr.apiService.removeData(curr.r.OrdersKey)
      curr.r.alert(null, null, curr.r.M_Save_Success)
    })
  }

  async onCommit() {
    console.log('OrderDetailPage,onCommit--')
    if (this.orders.length < 1) {
      this.r.alert(null, null, this.r.M_Save_DataEmpty);
    }
    if (!this.commitChecked()) return;

    let curr = this
    this.r.alertConfirm(
      null,
      this.r.M_Commit_Confirm,
      await async function () {

        const isOk = await curr.saveToServer();
        if (!isOk) return;

        await curr.clearData();
        //curr.r.alert(null, null, curr.r.M_Save_Success)
        curr.router.navigate(['/resultRedirect']);
      }
    )
  }

  async saveToServer(): Promise<Boolean> {
    let mainOrderInfo = this.getMainOrderInfo();
    let apiResult = await this.apiService.SaveOrderAsync(this.r.OrdersKey, JSON.stringify(mainOrderInfo));
    console.log('apiResult:', apiResult);
    if (apiResult.ResCode != 1000) {
      this.r.alert(null, null, apiResult.Message);
      return false;
    }

    for (let entity of this.orders) {
      if (entity && !entity.IsMainOrder) {
        let orderRequestInfo = new OrderRequestInfo();
        orderRequestInfo.OrderCode = entity.Barcode;
        orderRequestInfo.ParentOrderCode = mainOrderInfo.OrderCode;
        orderRequestInfo.BatchRandomCode = this.batchRandomCode;

        apiResult = await this.apiService.SaveOrderAsync(this.r.OrdersKey, JSON.stringify(orderRequestInfo));
        if (apiResult.ResCode != 1000) {
          this.r.alert(null, null, apiResult.Message);
          return false;
        }
      }
    }

    return true;
  }

  commitChecked(): boolean {
    if (!this.orders) return false
    let mainOrderNum: number = 0
    let curr = this
    for (let entity of curr.orders) {
      if (entity && entity.IsMainOrder) {
        mainOrderNum++
      }
    }
    if (mainOrderNum !== 1) {
      this.r.alert(null, null, this.r.M_Order_ExistOne)
      return false
    }

    return true
  }

  getMainOrderInfo(): OrderRequestInfo {
    for (let entity of this.orders) {
      if (entity && entity.IsMainOrder) {
        let orderRequestInfo = new OrderRequestInfo();
        orderRequestInfo.OrderCode = entity.Barcode;
        orderRequestInfo.ParentOrderCode = '';
        orderRequestInfo.Remark = this.remark;
        orderRequestInfo.BatchRandomCode = this.batchRandomCode;

        return orderRequestInfo;
      }
    }

    return null;
  }

  resetScan(){
    setTimeout(() => {
      this.barcode = '';
    }, 100);
  }

  async clearData() {
    await this.apiService.removeData(this.r.OrdersKey);
    this.orders = [];
    this.remark = '';
  }
}
