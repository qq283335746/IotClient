import { Component, OnInit, NgZone } from '@angular/core'
import { RService } from './../../services/r.service'
import { ApiClientService } from './../../services/api-client.service'
import { OrderInfo } from '../../models/OrderInfo'
import { Router } from '@angular/router';
import { OrderRequestInfo } from 'src/app/models/OrderRequestInfo';
import { UserInfo } from 'src/app/models/UserInfo';
import { OrderSendModel } from 'src/app/models/OrderSendModel';

@Component({
  selector: 'app-orderDetail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  constructor(
    private router: Router,
    private zone:NgZone,
    private r: RService,
    private apiService: ApiClientService
  ) {}

  userInfo = new UserInfo();
  orderInfoSelected = new OrderInfo();
  orderSendModel:OrderSendModel = {Orders:[],Remark:'',BatchRandomCode:this.r.getRndOrderCode()};

  barcode: string;

  async ngOnInit() {
    console.log('ngOnInit--');

    await this.loadData();
  }

  async loadData(){
    this.orderSendModel = await this.apiService.getData(this.r.OrderSendKey);
    if(!this.orderSendModel) {
      this.orderSendModel = {Orders:[],Remark:'', BatchRandomCode:this.r.getRndOrderCode()};
    }
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

    if(!this.orderSendModel.BatchRandomCode || this.orderSendModel.BatchRandomCode === '') this.orderSendModel.BatchRandomCode = this.r.getRndOrderCode();

    if (this.orderSendModel.Orders.length == 0) {
      this.orderInfoSelected.Id = this.r.GuidEmpty;
      this.orderInfoSelected.Barcode = this.barcode;
      this.orderInfoSelected.IsMainOrder = true;
    }

    let orderInfo = new OrderInfo();
    orderInfo.Id = this.r.GuidEmpty;
    orderInfo.Barcode = this.barcode;
    orderInfo.IsMainOrder = this.orderSendModel.Orders.length == 0;
    orderInfo.BatchRandomCode = this.orderSendModel.BatchRandomCode;

    this.orderSendModel.Orders.push(orderInfo);
    await this.apiService.setData(this.r.OrderSendKey, this.orderSendModel);

    this.resetScan();
  }

  isExistBarcode(barcode: string): boolean {
    if (!this.orderSendModel.Orders) return false

    for (let entity of this.orderSendModel.Orders) {
      if (entity && entity.Barcode === barcode) return true
    }

    return false
  }

  async onRemarkChanged(){
    console.log('onRemarkChanged--');
    await this.apiService.setData(this.r.OrderSendKey, this.orderSendModel);
  }

  onDelete(): void {
    let curr = this
    this.r.alertConfirm(null, this.r.M_Delete_Confirm, async function () {
      await curr.clearData();
      curr.r.alert(null, null, curr.r.M_Save_Success)
    })
  }

  async onCommit() {
    console.log('OrderDetailPage,onCommit--')
    console.log('this.batchRandomCode:',this.orderSendModel.BatchRandomCode);
    if (this.orderSendModel.Orders.length < 1) {
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

    for (let entity of this.orderSendModel.Orders) {
      if (entity && !entity.IsMainOrder) {
        let orderRequestInfo = new OrderRequestInfo();
        orderRequestInfo.OrderCode = entity.Barcode;
        orderRequestInfo.ParentOrderCode = mainOrderInfo.OrderCode;
        orderRequestInfo.BatchRandomCode = this.orderSendModel.BatchRandomCode;

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
    if (!this.orderSendModel.Orders) return false
    let mainOrderNum: number = 0
    let curr = this
    for (let entity of curr.orderSendModel.Orders) {
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
    for (let entity of this.orderSendModel.Orders) {
      if (entity && entity.IsMainOrder) {
        let orderRequestInfo = new OrderRequestInfo();
        orderRequestInfo.OrderCode = entity.Barcode;
        orderRequestInfo.ParentOrderCode = '';
        orderRequestInfo.Remark = this.orderSendModel.Remark;
        orderRequestInfo.BatchRandomCode = this.orderSendModel.BatchRandomCode;

        return orderRequestInfo;
      }
    }

    return null;
  }

  resetScan(){
    this.zone.run(()=>{
      setTimeout(() => {
        this.barcode = '';
      }, 100);
    })
  }

  async clearData() {
    await this.apiService.removeData(this.r.OrderSendKey);
    this.orderSendModel = {
      Orders:[],
      Remark:'',
      BatchRandomCode:this.r.getRndOrderCode()
    }
  }
}
