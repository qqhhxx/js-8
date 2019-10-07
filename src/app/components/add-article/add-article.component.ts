import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as wangEditor from '../../../../node_modules/wangeditor/release/wangEditor.js';
import * as $ from "jquery";
// import { type } from 'os';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.less']
})
export class AddArticleComponent implements OnInit {
  typelist = [{ type: '首页Banner', id: 0 }, 
  { type: '找职位Banner', id: 1 }, { type: '找精英Banner', id: 2 }, { type: '行业大图', id: 3 }];
  type = '';
  industrylist = [{ industry: '移动互联网', id: 0 }, { industry: '电子商务', id: 1 },
   { industry: '企业服务', id: 2 }, { industry: 'O2O', id: 3 }, { industry: '教育', id: 4 }, 
   { industry: '金融', id: 5 }, { industry: '游戏', id: 6 },]
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



  /* start 富文本编辑器 */
  public sign = 'wang_editor';

  private editor: any;




  /* end */



  constructor(private router: ActivatedRoute, private route: Router,
    private el: ElementRef, private renderer: Renderer ,private http: HttpClient) { }

  ngOnInit() {

    //初始化wangEditor

    this.editor = new wangEditor('#div1', '#div2')  // 两个参数也可以传入 elem 对象，class 选择器
    
    this.editor.customConfig.menus = [    //配置菜单
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'table',  // 表格
      'undo',  // 撤销
      'redo'  // 重复
    ]
    this.editor.create();


   


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

  



  //立即上线按钮功能
  status1() {


    const timeNow = + new Date();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const thisurl = localStorage.getItem('key');
    
    console.log(this.router.params);
    const url = '/apidata/a/u/article/' ;
    let apiData = this.http.post(url, {
      title: this.title,
      type: this.type,
      industry: this.industry,
      content: this.editor.txt.html(),
      url: this.link,
      img: thisurl,
      status: '2',
    
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
    
    console.log(this.router.params);
    const url = '/apidata/a/u/article/' ;
    const apiData = this.http.post(url, {
      title: this.title,
      type: this.type,
      industry: this.industry,
      content: this.editor.txt.html(),
      url: this.link,
      img: thisurl,
      status: '1',
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

  //取消按钮
  return(){
    history.back();
  }

}
