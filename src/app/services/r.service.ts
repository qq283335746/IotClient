import {Injectable} from '@angular/core'
import {Storage} from '@ionic/storage'
import {AlertController} from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class RService {
  constructor(public alertCtrl: AlertController, private storage: Storage) {
    console.log('getServerHost--', this.ServerHost)
    if (!this.ServerHost || this.ServerHost === '') {
      this.getServerHost()
      console.log('getServerHost--', this.ServerHost)
    }
  }

  ServerHost: string
  getServerHost() {
    this.storage.get(this.ServerHostKey).then(data => {
      if (data) this.ServerHost = data
    })
  }
  setServerHost(serverHost: string) {
    this.storage.set(this.ServerHostKey, serverHost)
  }

  OrdersKey: string = 'Orders'
  ServerHostKey: string = 'ServerHost'
  UserInfoKey: string = 'UserInfo'
  M_Save_Success: string = '恭喜您，操作成功！'
  M_Save_DataEmpty: string = '无任何可提交的数据！'

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
