import {Component, OnInit} from '@angular/core'
import {ApiClientService} from './../../services/api-client.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private apiService: ApiClientService) {}

  ngOnInit() {}
}
