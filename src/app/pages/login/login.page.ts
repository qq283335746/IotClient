import {UserInfo} from './../../models/UserInfo'
import {Component, OnInit} from '@angular/core'
import {ApiClientService} from './../../services/api-client.service'
import {Router} from '@angular/router'
import {RService} from 'src/app/services/r.service'

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
  ) {}

  userInfo: UserInfo = {
    UserId: '',
    UserName: '',
    RoleName: '',
    Password: '',
  }

  ngOnInit() {}

  async onLogin() {
    const res = await this.apiService.login(
      this.userInfo.UserName,
      this.userInfo.Password
    )

    await this.apiService.setData(this.r.UserInfoKey, this.userInfo)
    this.router.navigateByUrl('/orderDetail')

    return false
  }
}
