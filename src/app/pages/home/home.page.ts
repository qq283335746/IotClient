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
   
  }
}
