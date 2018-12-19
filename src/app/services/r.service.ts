import {Injectable} from '@angular/core'
import {Storage} from '@ionic/storage'
import {AlertController} from '@ionic/angular'
import {Observable, of} from 'rxjs'
import {async} from '@angular/core/testing'

@Injectable({
  providedIn: 'root',
})
export class RService {
  constructor(public alertCtrl: AlertController, private storage: Storage) {
    console.log('RService.constructor--')
    this.getServiceRootUrl()
  }

  RolesOptions: Array<string> = ['OrderPackage']

  ServiceRootUrl: string
  getServiceRootUrl() {
    if (this.ServiceRootUrl && this.ServiceRootUrl.trim() !== '') {
      console.log('this.ServiceRootUrl is not empty')
      return
    }
    this.storage.get(this.ServiceRootUrlKey).then(data => {
      console.log('getServiceRootUrl--data', data)
      if (data) this.ServiceRootUrl = data
      console.log(
        'getServiceRootUrl--this.ServiceRootUrl--',
        this.ServiceRootUrl
      )
    })
  }
  setServiceRootUrl(serviceRootUrl: string) {
    this.storage.set(this.ServiceRootUrlKey, serviceRootUrl)
  }

  Api_Login: string = this.ServiceRootUrl + '/Login'
  OrdersKey: string = 'Orders'
  ServiceRootUrlKey: string = 'ServiceRootUrl'
  UserInfoKey: string = 'UserInfo'
  M_Save_Success: string = '恭喜您，操作成功！'
  M_Save_DataEmpty: string = '无任何可提交的数据！'
  M_Form_Field_Empty: string = '带有“*”符号的为必须项，请检查'

  async alert(title: string, subTitle: string, message: string) {
    if (!title || title.trim() === '') title = '提示'
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      message: message,
      buttons: ['确定'],
    })

    await alert.present()
  }

  async alertAndCallback(
    title: string,
    subTitle: string,
    message: string,
    callback: Function
  ) {
    if (!title || title.trim() === '') title = '提示'
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            callback()
          },
        },
      ],
    })

    await alert.present()
  }

  findIndex(array: any, id: number) {
    var low = 0,
      high = array.length,
      mid: number
    while (low < high) {
      mid = (low + high) >>> 1
      array[mid]._Id < id ? (low = mid + 1) : (high = mid)
    }
    return low
  }
}
