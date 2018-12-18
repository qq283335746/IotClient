import {ApiClientService} from './services/api-client.service'
import {Component} from '@angular/core'
import {Platform} from '@ionic/angular'
import {SplashScreen} from '@ionic-native/splash-screen/ngx'
import {StatusBar} from '@ionic-native/status-bar/ngx'
import {Router} from '@angular/router'

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
      title: '订单',
      url: '/addOrder',
      icon: 'list',
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private apiService: ApiClientService
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      var userInfo = this.apiService.userInfo
      if (!this.apiService.userIsLogin) {
        this.router.navigateByUrl('/login')
        //this.router.navigate(['/login'])
      }
    })
  }
}
