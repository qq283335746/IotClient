import { UserInfo } from './../../models/UserInfo'
import { Component, OnInit } from '@angular/core'
import { ApiClientService } from './../../services/api-client.service'
import { Router } from '@angular/router'
import { RService } from 'src/app/services/r.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiClientService,
    private r: RService
  ) { }

  userInfo: UserInfo = {
    UserId: '',
    UserName: '',
    Password: '',
    Roles: [],
    Token: ''
  }

  ngOnInit() { }

  async onLogin() {
    // const res = await this.apiService.LoginAsync(
    //   this.userInfo.UserName,
    //   this.userInfo.Password
    // )

    // console.log('login--', res);

    // if (!res || res.ResCode != 1000) {
    //   this.r.alert(null, null, this.r.M_Login_InvalidError);
    //   return;
    // }

    // this.userInfo.Roles = res.Roles;
    // this.userInfo.Token = res.Token;

    await this.apiService.setData(this.r.UserInfoKey, this.userInfo);
    this.router.navigateByUrl('/orderDetail')
  }
}
