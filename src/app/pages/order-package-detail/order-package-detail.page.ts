import { Router } from '@angular/router'
import { ApiClientService } from './../../services/api-client.service'
import { Component, OnInit } from '@angular/core'
import { RService } from 'src/app/services/r.service'
import { OrderPackageInfo } from 'src/app/models/OrderPackageInfo'
import { OrderInfo } from 'src/app/models/OrderInfo'
import { OrderRequestInfo } from 'src/app/models/OrderRequestInfo';

@Component({
  selector: 'app-order-package-detail',
  templateUrl: './order-package-detail.page.html',
  styleUrls: ['./order-package-detail.page.scss'],
})
export class OrderPackageDetailPage implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiClientService,
    private r: RService
  ) { }

  orderPackageInfo: OrderPackageInfo = {
    ParentOrder: this.r.getRndOrderCode(),
    Orders: [],
    BatchRandomCode: this.r.getRndOrderCode()
  }
  orderInfo: OrderInfo
  //orderPackages: Array<OrderPackageInfo>
  barcode: string;
  batchRandomCode: string = this.r.getRndOrderCode();

  ngOnInit() {
    this.loadData()
  }

  async loadData() {
    const oldOrderPackageInfo = await this.apiService.getData(
      this.r.OrderPackagesKey
    )
    if (oldOrderPackageInfo) {
      this.orderPackageInfo = oldOrderPackageInfo;
      this.batchRandomCode = oldOrderPackageInfo.BatchRandomCode;
    }
  }

  isExistBarcode(barcode: string): boolean {
    if (
      !this.orderPackageInfo.Orders ||
      this.orderPackageInfo.Orders.length == 0
    )
      return false

    for (let entity of this.orderPackageInfo.Orders) {
      if (entity && entity.Barcode === barcode) return true
    }

    return false
  }

  async onBarcodeChanged() {
    if (
      !this.barcode ||
      this.barcode.trim() === '' ||
      this.isExistBarcode(this.barcode)
    ) {
      this.resetScan();
      return
    }

    this.orderInfo = {
      Id: this.r.GuidEmpty,
      Barcode: this.barcode,
      IsMainOrder: false,
      BatchRandomCode: this.orderPackageInfo.ParentOrder
    }
    this.orderPackageInfo.Orders.push(this.orderInfo)
    await this.apiService.setData(
      this.r.OrderPackagesKey,
      this.orderPackageInfo
    )

    this.resetScan();
  }

  onDelete() {
    let curr = this
    this.r.alertConfirm(null, this.r.M_Delete_Confirm, async function () {
      await curr.apiService.removeData(curr.r.OrderPackagesKey)
      await curr.clearData()

      curr.r.alert(null, null, curr.r.M_Save_Success)
    })
  }

  async onCommit() {
    let curr = this;
    this.r.alertConfirm(
      null,
      this.r.M_Commit_Confirm,
      await async function () {

        const isOk = await curr.saveToServer();
        if (!isOk) return;

        await curr.clearData()
        //curr.r.alert(null, null, curr.r.M_Save_Success);
        curr.router.navigate(['/resultRedirect']);
      }
    )
  }

  async saveToServer(): Promise<Boolean> {

    let mainOrderInfo = new OrderRequestInfo();
    mainOrderInfo.OrderCode = this.orderPackageInfo.ParentOrder;
    mainOrderInfo.ParentOrderCode = '';
    mainOrderInfo.BatchRandomCode = this.batchRandomCode;

    let apiResult = await this.apiService.SaveOrderAsync(this.r.OrderPackagesKey, JSON.stringify(mainOrderInfo));
    console.log('apiResult:', apiResult);
    if (apiResult.ResCode != 1000) {
      this.r.alert(null, null, apiResult.Message);
      return false;
    }

    for (let entity of this.orderPackageInfo.Orders) {
      let orderRequestInfo = new OrderRequestInfo();
      orderRequestInfo.OrderCode = entity.Barcode;
      orderRequestInfo.ParentOrderCode = this.orderPackageInfo.ParentOrder;
      orderRequestInfo.BatchRandomCode = this.batchRandomCode;

      apiResult = await this.apiService.SaveOrderAsync(this.r.OrderPackagesKey, JSON.stringify(orderRequestInfo));
    }

    return true;
  }

  resetScan(){
    setTimeout(() => {
      this.barcode = '';
    }, 100);
  }

  async clearData(): Promise<void> {
    await this.apiService.removeData(this.r.OrderPackagesKey);
    this.orderPackageInfo = {
      ParentOrder: this.r.getRndOrderCode(),
      Orders: [],
      BatchRandomCode:this.r.getRndOrderCode()
    }
  }
}
