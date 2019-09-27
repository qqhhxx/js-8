import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-menu-head',
  templateUrl: './menu-head.component.html',
  styleUrls: ['./menu-head.component.less']
})
export class MenuHeadComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }


  logout() {

    sessionStorage.clear(); // 清除登录信息
    location.href = 'index.html#/login'; // 设定该菜单跳转路由

  }

}
