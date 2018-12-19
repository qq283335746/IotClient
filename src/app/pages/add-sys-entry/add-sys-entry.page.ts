import {Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {SysInfo} from 'src/app/models/SysInfo'
import {RService} from 'src/app/services/r.service'
import {ApiClientService} from './../../services/api-client.service'

@Component({
  selector: 'app-add-sys-entry',
  templateUrl: './add-sys-entry.page.html',
  styleUrls: ['./add-sys-entry.page.scss'],
})
export class AddSysEntryPage implements OnInit {
  constructor(
    private r: RService,
    private apiService: ApiClientService,
    private router: Router
  ) {}

  sysInfo: SysInfo = {
    ServiceRootUrl: this.r.ServiceRootUrl,
  }

  ngOnInit() {}

  loadData() {}

  onSave() {
    console.log('onSave--')

    if (
      !this.sysInfo.ServiceRootUrl ||
      this.sysInfo.ServiceRootUrl.trim() === ''
    ) {
      this.r.alert(null, null, this.r.M_Form_Field_Empty)
      return false
    }

    this.r.setServiceRootUrl(this.sysInfo.ServiceRootUrl)
    let api = this.apiService
    let router = this.router
    this.r.alertAndCallback(null, null, this.r.M_Save_Success, function() {
      if (!api.userIsLogin) {
        router.navigateByUrl('/login')
      } else {
        router.navigateByUrl('/addOrder')
      }
    })
  }
}
