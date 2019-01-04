import { Component, OnInit } from '@angular/core';
import { RService } from 'src/app/services/r.service';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.page.html',
  styleUrls: ['./find-order.page.scss'],
})
export class FindOrderPage implements OnInit {

  constructor(private r: RService, private apiService: ApiClientService) {

  }

  barcode: string = "";
  orders: any

  ngOnInit() {
  }

  toOrderStatusName(orderStatus: number): string {
    return this.apiService.toOrderStatusName(orderStatus);
  }

  async onSearch() {
    console.log('onSearch--');
    if (this.barcode.trim() === '') return;
    const apiResult = await this.apiService.FindOrderRouterAsync(this.barcode);
    console.log('onSearch--', apiResult);
    if (apiResult.ResCode != 1000) {
      this.r.alert(null, null, apiResult.Message);
      return;
    }
    this.orders = apiResult.Orders;
  }

}
