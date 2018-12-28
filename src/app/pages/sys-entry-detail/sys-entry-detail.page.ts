//import {Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {SysInfo} from 'src/app/models/SysInfo'
import {RService} from 'src/app/services/r.service'
import {ApiClientService} from './../../services/api-client.service'
import { ApiResult } from 'src/app/models/ApiResult';
import { MenuController, NavController } from '@ionic/angular';

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
    IsLoginOut: this.apiService.userIsLogin,
  }

  apiResult:ApiResult={
    ResCode:-1,
    Message:''
  }

  ngOnInit() {
    this.menuCtrl.enable(this.apiService.userIsLogin);
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

    let currApi = this.apiService;
    let currRouter = this.navCtrl;
    this.r.alertAndCallback(null, null, this.r.M_Save_Success, function() {
      if(!currApi.userIsLogin) currRouter.navigateRoot('/login');
    })
  }

  async onLoginOut() {
    await this.apiService.loginOut()
    let currRouter = this.navCtrl
    this.r.alertAndCallback(null, null, this.r.M_Save_Success, function() {
      currRouter.navigateRoot('/login');
    })
  }
}
