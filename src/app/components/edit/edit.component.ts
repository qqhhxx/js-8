import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
// import { type } from 'os';






@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  typelist = [{ type: '首页Banner', id: 0 }, { type: '找职位Banner', id: 1 }, { type: '找精英Banner', id: 2 }, { type: '行业大图', id: 3 }];
  type = '';
  industrylist = [{ industry: '移动互联网', id: 0 }, { industry: '电子商务', id: 1 }, { industry: '企业服务', id: 2 }, { industry: 'O2O', id: 3 }, { industry: '教育', id: 4 }, { industry: '金融', id: 5 }, { industry: '游戏', id: 6 },]
  industry = '';
  title = '';
  link = '';
  content = '';
  size = '';
  fileToUpload: File;
  id: string;
  imgsrc: string;

  src: string;
  ischoosed = false;
  isloaded = false;
  detailData = '';


  constructor(private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    //展示当前id的信息包括标题名称，类型，说明等。

    this.getDetail();


  }

  //选择图片

  choose() {

    const fileElem = document.getElementById('fileElem');

    if (fileElem) {
      fileElem.click();
    }

  }

  handleFileInput($event) {
    console.log($event);
    this.fileToUpload = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (e) => {
      this.ischoosed = true;
      this.src = (e.target as any).result;

    };
    reader.onerror = (e) => {
      console.log('there is an error!');
    };


  }
  //上传图片
  postimage() {
    const oData = new FormData();
    oData.append('file', this.fileToUpload);
    const url = './apidata/a/u/img/task';
    const client = new XMLHttpRequest();
    client.open('POST', url);
    client.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const total: number = e.total;
        const loaded: number = e.loaded;
        const pct: number = loaded / total;
        const percentage = parseFloat(pct.toFixed(2)) * 100;
        (document.querySelector('.progress-item') as any).style.width = (percentage * 1.2) + 'px';
      }
    };


    client.onreadystatechange = (e) => {
      if (client.readyState === 4) {
        this.isloaded = true;

      }
    };


    client.onload = function () {
      if (this.status === 200 || this.status === 304) {
        console.log(this.response);
        const imgsrc = JSON.parse(this.responseText).data.url;
        localStorage.setItem('key', imgsrc);
        console.log(imgsrc);
      } else {
        console.log('err');
      }
    };
    client.send(oData);
  }

  getChange(e) {
    console.log('=========');
    console.log(e);


  }

  console(e) {
    console.log(e);
  }




  //立即上线按钮功能
  status1() {


    const timeNow = + new Date();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const thisurl = localStorage.getItem('key');
    const u = (this.router.params as any)._value.id;
    console.log(this.router.params);
    const url = '/apidata/a/u/article/' + u;
    let apiData = ajax.put(url, {
      title: this.title,
      type: this.type,
      industry: this.industry,
      content: this.content,
      url: this.link,
      img: thisurl,
      status: '2',
      id: u,


      author: "admin",

      createAt: 1568626566697,
      createBy: 2,

      order: "",
      publishat: 1568879141237,
      source: "",

      summary: "",


      updateAt: 1568898050774,
      updateBy: 2,

    }, { headers });

    apiData.subscribe(
      val => {
        console.log('PUT call successful value returned in body',
          val);
        this.route.navigate(['article/articlelist']);
      },
      response => {
        console.log('PUT call in error', response);
      },
      () => {
        console.log('The PUT observable is now completed.');
      }
    );
  }


  //存为草稿按钮功能
  status2() {
    const thisurl = localStorage.getItem('key');
    const u = (this.router.params as any)._value.id;
    console.log(this.router.params);
    const url = '/apidata/a/u/article/' + u;
    const apiData = ajax.put(url, {
      title: this.title,
      status: '1',
      img: thisurl,
      // type: this.type,
      url: this.link,
      // content: this.content,
    });

    apiData.subscribe(
      val => {
        console.log('PUT call successful value returned in body',
          val);
        this.route.navigate(['article/articlelist']);
      },
      response => {
        console.log('PUT call in error', response);
      },
      () => {
        console.log('The PUT observable is now completed.');
      }
    );
  }


  //显示详情页
  getDetail() {
    const u = (this.router.params as any)._value.id;
    const url_1 = '/apidata/a/article/' + u;
    const jump = ajax.get(url_1);
    jump.subscribe((date: any) => {
      console.log(date);
      this.detailData = (date as any).response.data.article;
      console.log(this.detailData);
      this.title = (this.detailData as any).title;
      this.type = (this.detailData as any).type;
      this.industry = (this.detailData as any).industry;
      this.content = (this.detailData as any).content;
      this.src = (this.detailData as any).img;
      this.link = (this.detailData as any).url;

    }, err => {
      console.log(err);
    });

  }



}








