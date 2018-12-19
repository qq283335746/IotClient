import {ApiClientService} from './../../services/api-client.service'
import {Component, OnInit} from '@angular/core'
import {OrderInfo} from 'src/app/models/OrderInfo'
import {RService} from 'src/app/services/r.service'

@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.page.html',
  styleUrls: ['./order-package.page.scss'],
})
export class OrderPackagePage implements OnInit {
  constructor(private apiService: ApiClientService, private r: RService) {}

  orderInfo: OrderInfo = {
    Id: '',
    Barcode: '',
    IsMainOrder: false,
  }
  orders: Array<OrderInfo>
  barcode: string
  selectItem: OrderInfo

  ngOnInit() {
    this.loadData()
  }

  async loadData(): Promise<void> {
    this.orders = await this.apiService.getData(this.r.OrdersKey)
    if (!this.orders) this.orders = new Array<OrderInfo>()
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

      this.apiService.setData(this.r.OrdersKey, this.orders)
    }
  }

  onCommit(): void {
    if (this.orders.length < 1) {
      this.r.alert(null, null, this.r.M_Save_DataEmpty)
    }

    this.r.alert(null, null, this.r.M_Save_Success)
  }
}
