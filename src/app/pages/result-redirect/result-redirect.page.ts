import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-redirect',
  templateUrl: './result-redirect.page.html',
  styleUrls: ['./result-redirect.page.scss'],
})
export class ResultRedirectPage implements OnInit {

  constructor() { }

  resultText:string="操作成功！";

  ngOnInit() {
  }

}
