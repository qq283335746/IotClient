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
import { ApiOrderResult } from '../models/ApiOrderResult';
import { ApiFindOrderRouterResult } from '../models/ApiFindOrderRouterResult';

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

  async SaveOrderAsync(funFlag: string, jsonData: string) {
    const apiRootUrl = await this.getApiRootUrl();
    const apiUrl = apiRootUrl + '/Order/SaveOrderAsync';

    let requestBaseInfo = await this.GetRequestBaseInfo();

    var reqInfo = { AppId: requestBaseInfo.AppId, AppSecret: requestBaseInfo.AppSecret, DeviceId: requestBaseInfo.DeviceId, Token: requestBaseInfo.Token, FunFlag: funFlag, Data: jsonData };

    console.log('SaveOrderAsync--reqInfo:', reqInfo);

    return this.httpClient.post<ApiOrderResult>(apiUrl, reqInfo).toPromise();
  }

  async FindOrderRouterAsync(orderCode: string): Promise<ApiFindOrderRouterResult> {
    const apiRootUrl = await this.getApiRootUrl();
    const apiUrl = apiRootUrl + '/Order/FindOrderRouterAsync';

    let requestBaseInfo = await this.GetRequestBaseInfo();
    var reqInfo = { AppId: requestBaseInfo.AppId, AppSecret: requestBaseInfo.AppSecret, DeviceId: requestBaseInfo.DeviceId, Token: requestBaseInfo.Token, OrderCode: orderCode };

    return this.httpClient.post<ApiFindOrderRouterResult>(apiUrl, reqInfo).toPromise();
  }

  async GetRequestBaseInfo(): Promise<RequestBaseInfo> {

    let requestInfo = new RequestBaseInfo();
    let userInfo = await this.getData(this.r.UserInfoKey);
    if (!userInfo) return requestInfo;

    requestInfo.AppId = this.r.AppId;
    requestInfo.AppSecret = this.r.AppSecret;
    requestInfo.DeviceId = this.r.DeviceId;
    requestInfo.Token = userInfo.Token;

    console.log('RequestBaseInfo:', requestInfo);

    return requestInfo;
  }

  async UserIsLogin(): Promise<Boolean> {
    let userInfo = await this.getData(this.r.UserInfoKey);
    return userInfo && userInfo.Token.trim() != '';
  }

  async GetUserInfoAsync(): Promise<UserInfo> {
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
    this.r.ApiRootUrl = await this.getData(this.r.ApiRootUrlKey);
    return this.r.ApiRootUrl;
  }
  async setApiRootUrl(value: string) {
    await this.setData(this.r.ApiRootUrlKey, value)
  }

  async apiTest(apiRootUrl: string) {
    const apiUrl = apiRootUrl + "/Order/GetHelloAsync";
    return this.httpClient.get<ApiTestResult>(apiUrl).toPromise();
  }

  toOrderStatusName(orderStatus: number): string {
    switch (orderStatus) {
      case 1:
        return '发货中';
      case 2:
        return '已打包';
      case 99:
        return '已签收';
      default:
        return '未知'
    }
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
