import {Component, OnInit} from '@angular/core'
import {AlertController} from '@ionic/angular'
import {RService} from './../../services/r.service'
import {ApiClientService} from './../../services/api-client.service'
import {OrderInfo} from '../../models/OrderInfo'
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderDetail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  constructor(
    private router: Router,
    private alert: AlertController,
    private r: RService,
    private apiService: ApiClientService
  ) {
      this.orders = new Array<OrderInfo>()
  }

  orderInfo: OrderInfo = {
    Id: '',
    Barcode: '',
    IsMainOrder: false,
  }

  orderInfoSelected: OrderInfo = {
    Id: '',
    Barcode: '',
    IsMainOrder: false,
  }

  barcode: string
  orders: Array<OrderInfo>
  isMainOrder: boolean

  async ngOnInit() {
    console.log('ngOnInit--');
    
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.orders = await this.apiService.getData(this.r.OrdersKey)
    if (!this.orders) this.orders = []
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
      this.barcode = ''
      return
    }

    if (this.orders.length == 0) {
      this.orderInfoSelected = {
        Id: this.r.GuidEmpty,
        Barcode: this.barcode,
        IsMainOrder: true,
      }
    }

    this.orderInfo = {
      Id: this.r.GuidEmpty,
      Barcode: this.barcode,
      IsMainOrder: this.orders.length == 0,
    }

    this.orders.push(this.orderInfo)
    await this.apiService.setData(this.r.OrdersKey, this.orders)

    this.barcode = ''
  }

  onDelete(): void {
    let curr = this
    this.r.alertConfirm(null, this.r.M_Delete_Confirm, async function() {
      curr.orders = []
      await curr.apiService.removeData(curr.r.OrdersKey)
      curr.r.alert(null, null, curr.r.M_Save_Success)
    })
  }

  async onCommit(): Promise<void> {
    if (this.orders.length < 1) {
      this.r.alert(null, null, this.r.M_Save_DataEmpty)
    }
    if (!this.commitChecked()) return

    let curr = this
    this.r.alertConfirm(
      null,
      this.r.M_Commit_Confirm,
      await async function() {
        await curr.clearData()
        curr.r.alert(null, null, curr.r.M_Save_Success)
      }
    )
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

  async clearData(): Promise<void> {
    await this.apiService.removeData(this.r.OrdersKey)
    this.orders = []
  }
}