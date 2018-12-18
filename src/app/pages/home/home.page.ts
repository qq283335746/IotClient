import {Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {ApiClientService} from './../../services/api-client.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private apiService: ApiClientService) {}

  ngOnInit() {
    const url =
      'http://47.106.189.244/api/article/articlelist?dataId=d0000720b000000a000260e4&widgetId=e0000720b000000b000260e4&clientType=WapH5&loginUserId=0&sign='
    this.apiService.httpGet(url).subscribe(res => {
      console.log('HomePage--', res)
    })
    //this.router.navigateByUrl('/login')
  }
}
