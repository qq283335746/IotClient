import {Injectable} from '@angular/core'
import {AlertController} from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class RService {
  constructor(public alertCtrl: AlertController) {
    console.log('RService.constructor--')
  }

  RolesOptions: Array<string> = ['OrderPackage']

  ServiceRootUrl: string
  ServiceRootUrlKey: string = 'ServiceRootUrl'
  Api_Hello: string = '/Services/PdaService.svc/GetHelloWord'
  Api_Login: string = this.ServiceRootUrl + '/Login'
  OrdersKey: string = 'Orders'
  OrderPackagesKey: string = 'OrderPackages'
  UserInfoKey: string = 'UserInfo'
  GuidEmpty: string = '00000000-0000-0000-0000-000000000000'
  M_Save_Success: string = '恭喜您，操作成功！'
  M_Save_DataEmpty: string = '无任何可提交的数据！'
  M_ApiRootUrlInvalidError:string='请正确输入接口地址！'
  M_Form_Field_Empty: string = '带有“*”符号的为必须项，请检查'
  M_Delete_Confirm: string = '确定要删除操作吗？'
  M_Commit_Confirm: string = '确定要提交吗？'
  M_Order_ExistOne: string = '必须设置一个且仅一个订单号作为主订单'

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
          text: '确定',
          handler: () => {
            callback()
          },
        },
      ],
    })

    await alert.present()
  }

  async alertConfirm(title: string, message: string, callback: Function) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: blah => {
            //console.log('Confirm Cancel: blah')
          },
        },
        {
          text: '确定',
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

  getRndOrderCode(): string {
    const date = new Date()

    return (
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date
        .getDate()
        .toString()
        .padStart(2, '0') +
      date
        .getHours()
        .toString()
        .padStart(2, '0') +
      date
        .getMinutes()
        .toString()
        .padStart(2, '0') +
      date
        .getSeconds()
        .toString()
        .padStart(2, '0') +
      this.getRndCode(11, 99).toString()
    )
  }

  getRndCode(min: number, max: number) {
    var range = max - min
    var rand = Math.random()
    return min + Math.round(rand * range)
  }
}
