import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RService } from './r.service'
import { UserInfo } from './../models/UserInfo'
import { ApiTestResult } from '../models/ApiTestResult';
import { LoginResult } from '../models/LoginResult';
import { LoginRequestInfo } from '../models/LoginRequestInfo';
import { RequestBaseInfo } from '../models/RequestBaseInfo';
import { ApiResult } from '../models/ApiResult';
import { OrderRequestInfo } from '../models/OrderRequestInfo';
import { ApiOrderResult } from '../models/ApiOrderResult';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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
  }

  userInfo: UserInfo = {
    UserId: '',
    UserName: '',
    Password: '',
    Roles: [],
    Token: ''
  }

  //数据存储时Key的前缀
  dataKeyPre: string = this.userInfo.UserName + '_'

  async getHelloWord() {
    const apiRootUrl = await this.getApiRootUrl();
    const url = apiRootUrl + this.r.Api_Hello;
    return this.httpClient.get(url).toPromise();
  }

  async SaveOrderAsync(funFlag:string,jsonData:string) {
    const apiRootUrl = await this.getApiRootUrl();
    const apiUrl = apiRootUrl + '/Order/SaveOrderAsync';

    let userInfo = await this.getData(this.r.UserInfoKey);

    var reqInfo = {AppId:this.r.AppId,AppSecret:this.r.AppSecret,DeviceId:this.r.DeviceId,Token:userInfo.Token,FunFlag:funFlag,Data:jsonData};

    console.log('SaveOrderAsync--reqInfo:',reqInfo);

    return this.httpClient.post<ApiOrderResult>(apiUrl, reqInfo).toPromise();
  }

  async UserIsLogin(): Promise<Boolean> {
    let userInfo = await this.getData(this.r.UserInfoKey);
    return userInfo && userInfo.Token.trim() != '';
  }

  async GetUserInfoAsync():Promise<UserInfo>{
    return await this.getData(this.r.UserInfoKey);
  }

  async LoginAsync(userName: string, password: string) {
    const apiRootUrl = await this.getApiRootUrl();
    const apiUrl = apiRootUrl + '/Order/LoginAsync'
    let requestInfo: LoginRequestInfo = {
      AppId: this.r.AppId,
      AppSecret: this.r.AppSecret,
      DeviceId: this.r.DeviceId,
      Token: "",
      UserName: userName,
      Password: password
    }
    return this.httpClient.post<LoginResult>(apiUrl, requestInfo).toPromise();
  }
  async loginOut() {
    await this.removeData(this.r.UserInfoKey)
    this.userInfo.UserName = ''
  }

  async getApiRootUrl(): Promise<string> {
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

  async apiTest(apiRootUrl: string) {
    const apiUrl = apiRootUrl + "/Order/GetHelloAsync";
    return this.httpClient.get<ApiTestResult>(apiUrl).toPromise();
  }

  async httpGet(url: string) {
    return this.httpClient.get<ApiResult>(url).toPromise();
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
