import {Router} from '@angular/router'
import {ApiClientService} from './../../services/api-client.service'
import {Component, OnInit} from '@angular/core'
import {RService} from 'src/app/services/r.service'
import {OrderPackageInfo} from 'src/app/models/OrderPackageInfo'
import {OrderInfo} from 'src/app/models/OrderInfo'

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
  ) {}

  orderPackageInfo: OrderPackageInfo = {
    ParentOrder: this.r.getRndOrderCode(),
    Orders: [],
  }
  orderInfo: OrderInfo
  //orderPackages: Array<OrderPackageInfo>
  barcode: string

  ngOnInit() {
    this.loadData()
  }

  async loadData(): Promise<void> {
    const oldOrderPackageInfo = await this.apiService.getData(
      this.r.OrderPackagesKey
    )
    if (oldOrderPackageInfo) this.orderPackageInfo = oldOrderPackageInfo
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

  async onBarcodeChanged(): Promise<void> {
    if (
      !this.barcode ||
      this.barcode.trim() === '' ||
      this.isExistBarcode(this.barcode)
    ) {
      this.barcode = ''
      return
    }

    this.orderInfo = {
      Id: this.r.GuidEmpty,
      Barcode: this.barcode,
      IsMainOrder: false,
    }
    this.orderPackageInfo.Orders.push(this.orderInfo)
    await this.apiService.setData(
      this.r.OrderPackagesKey,
      this.orderPackageInfo
    )

    this.barcode = ''
  }

  onDelete(): void {
    let curr = this
    this.r.alertConfirm(null, this.r.M_Delete_Confirm, async function() {
      await curr.apiService.removeData(curr.r.OrderPackagesKey)
      await curr.clearData()

      curr.r.alert(null, null, curr.r.M_Save_Success)
    })
  }

  async onCommit(): Promise<void> {
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

  async clearData(): Promise<void> {
    await this.apiService.removeData(this.r.OrderPackagesKey)
    this.orderPackageInfo = {
      ParentOrder: this.r.getRndOrderCode(),
      Orders: [],
    }
  }
}
