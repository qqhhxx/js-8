import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
 

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    
  });

  constructor(private http: HttpClient,private fb: FormBuilder) { }

// 登录的ajax请求
  login2() {

    
    const url = '/apidata/a/login';
    //const url = 'http://dev.admin.carrots.ptteng.com/a/login';


    let u = (<HTMLInputElement>document.getElementById("username")).value;

    let p = (<HTMLInputElement>document.getElementById("password")).value;

    const apiData = ajax.post(url, {
      "name": u,
      "pwd": p
    });
    apiData.subscribe((val) => {
      console.log('POST call successful value returned in body',
        val);
        window.location.href = "/article/welcome";//如果成功就跳转到此页面
    },
    response => {
      console.log('POST call in error', response);
    },
    () => {
      console.log('The POST observable is now completed.');
    });
  }


 

  ngOnInit() {
  }

}
