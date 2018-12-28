import {Injectable} from '@angular/core'
import {Storage} from '@ionic/storage'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {RService} from './r.service'
import {UserInfo} from './../models/UserInfo'
import { ApiTestResult } from '../models/ApiTestResult';
import { LoginResult } from '../models/LoginResult';
import { LoginRequestInfo } from '../models/LoginRequestInfo';

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
    this.getApiRootUrl()
    this.getUserInfo()
  }

  userInfo: UserInfo = {
    UserId: '',
    UserName: '',
    RoleName: '',
    Password: '',
  }

  userIsLogin: boolean = this.userInfo.UserName !== ''
  //数据存储时Key的前缀
  dataKeyPre: string = this.userInfo.UserName + '_'

  async getHelloWord() {
    this.httpGet((await this.getApiRootUrl()) + this.r.Api_Hello).subscribe(
      res => {
        console.log('getHelloWord--', res)
      }
    )
  }

  async getApiRootUrl():Promise<string> {
    if (this.r.ApiRootUrl && this.r.ApiRootUrl.trim() !== '') {
      return this.r.ApiRootUrl
    }
    const data = await this.getData(this.r.ApiRootUrlKey)
    if (data) this.r.ApiRootUrl = data

    return this.r.ApiRootUrl
  }
  async setApiRootUrl(value: string) {
    await this.setData(this.r.ApiRootUrlKey, value)
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

  async apiTest(apiRootUrl:string){
    const apiUrl = apiRootUrl+"/Order/GetHelloAsync";
    return this.httpClient.get<ApiTestResult>(apiUrl).toPromise();
  }

  async LoginAsync(userName: string, password: string) {
    const apiRootUrl = await this.getApiRootUrl();
    const apiUrl = apiRootUrl + '/Order/LoginAsync'
    let requestInfo:LoginRequestInfo={
      AppId:this.r.AppId,
      AppSecret:this.r.AppSecret,
      Token:"",
      UserName:userName,
      Password:password
    }
    return this.httpClient.post<LoginResult>(apiUrl,requestInfo).toPromise();
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
