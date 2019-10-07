import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-menu-head',
  templateUrl: './menu-head.component.html',
  styleUrls: ['./menu-head.component.less']
})
export class MenuHeadComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  logout() {
    const url = '/apidata/a/logout';
    const apiData = ajax.post(url, {});
    apiData.subscribe((val) => {
      console.log('POST call successful value returned in body',
        val);
        sessionStorage.clear(); // 清除登录信息

        location.href = 'index.html'; // 设定该菜单跳转路由
    },
    response => {
      console.log('POST call in error', response);
    },
    () => {
      console.log('The POST observable is now completed.');
    });

  }

}
