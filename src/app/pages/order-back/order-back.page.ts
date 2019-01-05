import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RService } from 'src/app/services/r.service';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-order-back',
  templateUrl: './order-back.page.html',
  styleUrls: ['./order-back.page.scss'],
})
export class OrderBackPage implements OnInit {

  constructor(private router: Router,private r: RService,private apiService: ApiClientService) { 

  }

  barcode: string;
  barcodes: Array<string> = [];

  ngOnInit() {
  }

  onDelete(){
    this.barcodes = [];
    this.barcode = "";
  }

  onBarcodeChanged() {
    console.log('onBarcodeChanged--');

    if(this.barcode.trim() === "" || this.isExistBarcode(this.barcode)){
      this.resetScan();
      return;
    }
    this.barcodes.push(this.barcode);
    this.resetScan();
  }

  isExistBarcode(barcode: string): boolean {
    if (!this.barcodes) return false;

    for (let item of this.barcodes) {
      if (item === barcode) return true;
    }

    return false;
  }

  async onCommit() {
    console.log('OrderBackPage,onCommit--')
    if (this.barcodes.length < 1) {
      this.r.alert(null, null, this.r.M_Save_DataEmpty);
    }

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

    for (let item of this.barcodes) {
      const apiResult = await this.apiService.SaveOrderAsync(this.r.OrderBackKey, item);
        if (apiResult.ResCode != 1000) {
          this.r.alert(null, null, apiResult.Message);
          return false;
        }
    }

    return true;
  }

  resetScan() {
    setTimeout(() => {
      this.barcode = '';
    }, 100);
  }

  clearData(){
    setTimeout(() => {
      this.barcodes = [];
    }, 100);
  }

}
