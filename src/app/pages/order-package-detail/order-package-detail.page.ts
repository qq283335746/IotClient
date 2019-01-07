import { Router } from '@angular/router'
import { ApiClientService } from './../../services/api-client.service'
import { Component, OnInit, NgZone } from '@angular/core'
import { RService } from 'src/app/services/r.service'
import { OrderPackageModel } from 'src/app/models/OrderPackageModel'
import { OrderInfo } from 'src/app/models/OrderInfo'
import { OrderRequestInfo } from 'src/app/models/OrderRequestInfo';

@Component({
  selector: 'app-order-package-detail',
  templateUrl: './order-package-detail.page.html',
  styleUrls: ['./order-package-detail.page.scss'],
})
export class OrderPackageDetailPage implements OnInit {

  orderPackageModel: OrderPackageModel = {
    ParentOrder: this.r.getRndOrderCode(),
    Orders: [],
    BatchRandomCode: this.r.getRndOrderCode()
  }
  orderInfo: OrderInfo;
  barcode: string;

  constructor(
    private router: Router,
    private zone:NgZone,
    private apiService: ApiClientService,
    private r: RService
  ) 
  { 
    this.zone.run(()=>{
      this.resetScan();
    })
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const oldOrderPackageModel = await this.apiService.getData(
      this.r.OrderPackagesKey
    )
    if (oldOrderPackageModel) {
      this.orderPackageModel = oldOrderPackageModel;
      this.orderPackageModel.BatchRandomCode = oldOrderPackageModel.BatchRandomCode;
    }
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
      BatchRandomCode: this.orderPackageModel.BatchRandomCode
    }
    this.orderPackageModel.Orders.push(this.orderInfo);
    await this.apiService.setData(
      this.r.OrderPackagesKey,
      this.orderPackageModel
    )

    this.resetScan();
  }

  isExistBarcode(barcode: string): boolean {
    if (
      !this.orderPackageModel.Orders ||
      this.orderPackageModel.Orders.length == 0
    )
      return false

    for (let entity of this.orderPackageModel.Orders) {
      if (entity && entity.Barcode === barcode) return true
    }

    return false
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
    mainOrderInfo.OrderCode = this.orderPackageModel.ParentOrder;
    mainOrderInfo.ParentOrderCode = '';
    mainOrderInfo.BatchRandomCode = this.orderPackageModel.BatchRandomCode;

    let apiResult = await this.apiService.SaveOrderAsync(this.r.OrderPackagesKey, JSON.stringify(mainOrderInfo));
    console.log('apiResult:', apiResult);
    if (apiResult.ResCode != 1000) {
      this.r.alert(null, null, apiResult.Message);
      return false;
    }

    for (let entity of this.orderPackageModel.Orders) {
      let orderRequestInfo = new OrderRequestInfo();
      orderRequestInfo.OrderCode = entity.Barcode;
      orderRequestInfo.ParentOrderCode = this.orderPackageModel.ParentOrder;
      orderRequestInfo.BatchRandomCode = this.orderPackageModel.BatchRandomCode;

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
    this.orderPackageModel = {
      ParentOrder: this.r.getRndOrderCode(),
      Orders: [],
      BatchRandomCode:this.r.getRndOrderCode()
    }
  }
}
