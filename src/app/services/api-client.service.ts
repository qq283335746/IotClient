import {Injectable} from '@angular/core'
import {Storage} from '@ionic/storage'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {RService} from './r.service'
import {UserInfo} from './../models/UserInfo'

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(
    private storage: Storage,
    private httpClient: HttpClient,
    private r: RService
  ) {
    console.log('userInfo--', this.userInfo)
    if (this.userInfo.UserName === '') {
      this.getUserInfo()
      console.log('userInfo--', this.userInfo)
    }
  }

  userInfo: UserInfo = {
    UserId: '',
    UserName: '',
    RoleName: '',
  }

  userIsLogin: boolean = this.userInfo.UserName !== ''

  getUserInfo() {
    this.storage.get(this.r.UserInfoKey).then(data => {
      if (data) this.userInfo = data
    })
  }

  httpGet(url: string) {
    return this.httpClient.get(url)
  }
}
