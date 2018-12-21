import {Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {SysInfo} from 'src/app/models/SysInfo'
import {RService} from 'src/app/services/r.service'
import {ApiClientService} from './../../services/api-client.service'

@Component({
  selector: 'app-sys-entry-detail',
  templateUrl: './sys-entry-detail.page.html',
  styleUrls: ['./sys-entry-detail.page.scss'],
})
export class SysEntryDetailPage implements OnInit {
  constructor(
    private router: Router,
    private r: RService,
    private apiService: ApiClientService
  ) {}

  sysInfo: SysInfo = {
    ServiceRootUrl: this.r.ServiceRootUrl,
  }

  ngOnInit() {}

  loadData() {}

  async onSave() {
    if (
      !this.sysInfo.ServiceRootUrl ||
      this.sysInfo.ServiceRootUrl.trim() === ''
    ) {
      this.r.alert(null, null, this.r.M_Form_Field_Empty)
      return false
    }

    await this.apiService.setServiceRootUrl(this.sysInfo.ServiceRootUrl)
    let currApi = this.apiService
    let currRouter = this.router
    this.r.alertAndCallback(null, null, this.r.M_Save_Success, function() {
      if (!currApi.userIsLogin) {
        currRouter.navigateByUrl('/login')
      } else {
        currRouter.navigateByUrl('/orderDetail')
      }
    })
  }
}
