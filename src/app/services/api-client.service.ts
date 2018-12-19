import {Injectable} from '@angular/core'
import {Storage} from '@ionic/storage'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {RService} from './r.service'
import {UserInfo} from './../models/UserInfo'
import {Observable} from 'rxjs'
import {ApiResult} from '../models/ApiResult'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
}

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
    Password: '',
  }
  apiResult: ApiResult = {
    ResCode: -1,
    Message: '',
  }

  userIsLogin: boolean = this.userInfo.UserName !== ''

  getUserInfo() {
    this.storage.get(this.r.UserInfoKey).then(data => {
      if (data) this.userInfo = data
    })
  }

  setUserInfo(userInfo: UserInfo) {
    this.storage.set(this.r.UserInfoKey, userInfo)
  }

  async login(userName: string, password: string) {
    return this.userInfo
    // return this.httpClient.post(this.r.Api_Login, {
    //   userName: userName,
    //   password: password,
    // })
  }
  async loginOut() {
    await this.removeData(this.r.UserInfoKey)
    this.userInfo.UserName = ''
  }

  httpGet(url: string) {
    return this.httpClient.get(url)
  }

  async getData(key: string) {
    const res = await this.storage.get(key)
    console.log('storage,Key is', key)
    return res
  }

  async setData(key: string, value: any) {
    const res = await this.storage.set(key, value)
    console.log('storage', res)
  }

  async removeData(key: string) {
    await this.storage.remove(key)
  }
}
