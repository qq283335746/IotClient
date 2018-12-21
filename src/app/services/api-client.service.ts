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
    this.getServiceRootUrl()
    this.getUserInfo()
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
  //数据存储时Key的前缀
  dataKeyPre: string = this.userInfo.UserName + '_'

  async getServiceRootUrl() {
    if (this.r.ServiceRootUrl && this.r.ServiceRootUrl.trim() !== '') {
      return this.r.ServiceRootUrl
    }
    const data = await this.getData(this.r.ServiceRootUrlKey)
    if (data) this.r.ServiceRootUrl = data

    return this.r.ServiceRootUrl
  }
  async setServiceRootUrl(value: string) {
    await this.setData(this.r.ServiceRootUrlKey, value)
  }

  async getUserInfo() {
    if (this.userInfo && this.userInfo.UserName !== '') {
      return this.userInfo
    }
    if (!this.userInfo || this.userInfo.UserName.trim() === '') {
      let data = await this.getData(this.r.UserInfoKey)
      if (data) this.userInfo = data
    }

    return this.userInfo
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
    return await this.storage.get(this.dataKeyPre + key)
  }

  async setData(key: string, value: any) {
    await this.storage.set(this.dataKeyPre + key, value)
  }

  async removeData(key: string) {
    await this.storage.remove(this.dataKeyPre + key)
  }
}
