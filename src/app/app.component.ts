import {UserInfo} from './models/UserInfo'
import {Component} from '@angular/core'
import {Platform} from '@ionic/angular'
import {SplashScreen} from '@ionic-native/splash-screen/ngx'
import {StatusBar} from '@ionic-native/status-bar/ngx'
import {Router} from '@angular/router'
import {RService} from './services/r.service'
import {ApiClientService} from './services/api-client.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    // {
    //   title: '首页',
    //   url: '/home',
    //   icon: 'home',
    // },
    {
      title: '订单扫描',
      url: '/orderDetail',
      icon: 'qr-scanner',
    },
    {
      title: '订单包装',
      url: '/orderPackageDetail',
      icon: 'rose',
    },
    {
      title: '系统设置',
      url: '/sysEntryDetail',
      icon: 'build',
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private r: RService,
    private apiService: ApiClientService
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      const serviceRootUrl = await this.apiService.getData(
        this.r.ServiceRootUrlKey
      )
      const userInfo: UserInfo = await this.apiService.getData(
        this.r.UserInfoKey
      )

      if (!serviceRootUrl || serviceRootUrl === '') {
        this.router.navigateByUrl('/sysEntryDetail')
      } else if (!userInfo || userInfo.UserName == '') {
        this.router.navigateByUrl('/login')
        //this.router.navigate(['/login'])
      } else {
        const userInfo = await this.apiService.getData(this.r.UserInfoKey)
        if (userInfo.RoleName === this.r.RolesOptions[0]) {
          this.router.navigateByUrl('/orderPackageDetail')
        } else {
          this.router.navigateByUrl('/orderDetail')
        }
      }
    })
  }
}
