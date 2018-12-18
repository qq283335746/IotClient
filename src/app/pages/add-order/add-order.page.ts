import {Component, OnInit} from '@angular/core'
import {AlertController} from '@ionic/angular'
import {Storage} from '@ionic/storage'
import {RService} from './../../services/r.service'
import {OrderInfo} from '../../models/OrderInfo'

@Component({
  selector: 'app-addOrder',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {
  constructor(
    private alert: AlertController,
    private storage: Storage,
    private r: RService
  ) {
    this.orders = new Array<OrderInfo>()
  }

  orderInfo: OrderInfo = {
    Id: '',
    Barcode: '',
    IsMainOrder: false,
  }

  barcode: string
  orders: Array<OrderInfo>
  isMainOrder: boolean

  ngOnInit() {
    this.loadData()
  }

  loadData(): void {
    this.storage.get(this.r.OrdersKey).then(data => {
      console.log('val--', data)
      if (data) this.orders = data
      //this.orders = val
    })
  }

  isExistBarcode(barcode: string): boolean {
    console.log('isExistBarcode--barcode--', barcode)
    console.log('isExistBarcode--orders', this.orders)
    if (!this.orders) return false

    for (let entity of this.orders) {
      if (entity && entity.Barcode === barcode) return true
    }

    return false
  }

  onBarcodeChanged(): void {
    console.log('onBarcodeChanged')
    console.log('barcode--', this.barcode)
    if (!this.barcode || this.barcode.trim() === '') return

    console.log('isExistBarcode--', this.isExistBarcode(this.barcode))
    if (!this.isExistBarcode(this.barcode)) {
      this.orderInfo = {
        Id: '0',
        Barcode: this.barcode,
        IsMainOrder: this.orders.length == 0,
      }
      //let orderInfo = new OrderInfo('0', this.barcode)
      console.log('orderInfo--', this.orderInfo)
      this.orders.push(this.orderInfo)

      console.log('--orders--', this.orders)

      this.storage.set(this.r.OrdersKey, this.orders)
    }
  }

  onCommit(): void {
    if (this.orders.length < 1) {
      this.r.alert(null, null, this.r.M_Save_DataEmpty)
    }

    this.r.alert(null, null, this.r.M_Save_Success)
  }

  
}
