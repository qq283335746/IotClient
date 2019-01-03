//import {Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {SysInfo} from 'src/app/models/SysInfo'
import {RService} from 'src/app/services/r.service'
import {ApiClientService} from './../../services/api-client.service'
import { ApiResult } from 'src/app/models/ApiResult';
import { MenuController, NavController } from '@ionic/angular';
import { UserInfo } from 'src/app/models/UserInfo';

@Component({
  selector: 'app-sys-entry-detail',
  templateUrl: './sys-entry-detail.page.html',
  styleUrls: ['./sys-entry-detail.page.scss'],
})
export class SysEntryDetailPage implements OnInit {
  constructor(
    private menuCtrl:MenuController,
    private navCtrl:NavController,
    //private router: Router,
    private r: RService,
    private apiService: ApiClientService
  ) {}

  sysInfo: SysInfo = {
    ApiRootUrl: this.r.ApiRootUrl,
    IsLogin: false,
    BtnLoginText:'登录',
    WelcomeText:''
  }

  apiResult:ApiResult={
    ResCode:-1,
    Message:''
  }

  userInfo:UserInfo;

  async ngOnInit() {
    console.log('SysEntryDetailPage,ngOnInit--')
    this.userInfo = await this.apiService.GetUserInfoAsync();
    console.log('UserInfoKey--userInfo:',this.userInfo);
    this.sysInfo.IsLogin = this.userInfo && this.userInfo.Token.trim() != '';
    //this.menuCtrl.enable(!this.sysInfo.IsLoginOut);
    //console.log('this.sysInfo.IsLoginOut:',this.sysInfo.IsLogin);
    this.sysInfo.BtnLoginText = this.sysInfo.IsLogin ? '退出登录':'登录';
    if(this.userInfo) {
      this.sysInfo.WelcomeText = '欢迎：'+this.userInfo.UserName;
    }
  }

  loadData() {}

  async onApiTest() {
    console.log('onApiTest--')
    if(!this.sysInfo.ApiRootUrl || this.sysInfo.ApiRootUrl.trim() === ''){
      this.r.alert(null,null,this.r.M_ApiRootUrlInvalidError)
      return;
    }
    try{
      const res = await this.apiService.apiTest(this.sysInfo.ApiRootUrl);
      console.log('apiTest result:', res);
      if(!res){
        this.r.alert(null,null,this.r.M_ApiRootUrlInvalidError);
      }
      else{
        this.r.alert(null,null,this.r.M_Save_Success);
      }
    }
    catch(e){
      this.r.alert(null,null,this.r.M_ApiRootUrlInvalidError);
    }
  }

  async onSave() {
    if (
      !this.sysInfo.ApiRootUrl ||
      this.sysInfo.ApiRootUrl.trim() === ''
    ) {
      this.r.alert(null, null, this.r.M_Form_Field_Empty)
      return false
    }

    await this.apiService.setApiRootUrl(this.sysInfo.ApiRootUrl);

    let curr = this;
    let currApi = this.apiService;
    let currRouter = this.navCtrl;
    this.r.alertAndCallback(null, null, this.r.M_Save_Success, function() {
      if(!curr.sysInfo.IsLogin) currRouter.navigateRoot('/login');
    })
  }

  async onDoLogin() {
    if(this.sysInfo.BtnLoginText == '退出登录'){
      await this.apiService.loginOut()
      let currRouter = this.navCtrl
      this.r.alertAndCallback(null, null, this.r.M_Save_Success, function() {
        currRouter.navigateRoot('/login');
      })
    }
    else{
      this.navCtrl.navigateRoot('/login');
    }
  }
}
