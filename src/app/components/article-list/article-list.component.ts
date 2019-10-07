import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less']
})
export class ArticleListComponent implements OnInit, DoCheck {

  typelist = [{ type: '全部', id: '' },
  { type: '首页Banner', id: 0 }, { type: '找职位Banner', id: 1 }, { type: '找精英Banner', id: 2 }, { type: '行业大图', id: 3 }];
  typeItem = '';
  statuslist = [{ type: '全部', id: '' }, { type: '草稿', id: 1 }, { type: '上线', id: 2 }];
  statusItem = '';
  size = 'small';


  listOfData = [];
  param: any;
  title: string;
  pageindex :string;
  oldPageindex: string;
  counts: number = 0;
  pagesize = 10;
  total = 300;
  bgo = true;

  currentStyles = {
    'background': "orange",
    'font-size': "55px"
  };

  // something about nz-date-picker

  startValue: Date | null = null;
  endValue: Date | null = null;

  //日期选择面板隐藏
  endOpen = false;
  start = null;
  end = null;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;

  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {

      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }


  constructor(private dataservice: DataService, private http: HttpClient,
    private router: Router, private el: ElementRef) { }

  //跳转到编辑页（带参数）
 /*  goedit(i) {
    let navigationExtras: NavigationExtras = {
      queryParams: { id: this.listOfData[i].id }
    };
    this.router.navigate(['../edit/'], navigationExtras);

  } */


  //下线功能
  offline(i) {
    const u = this.listOfData[i].id;
    console.log(typeof (u));
    const url = '/apidata/a/u/article/status';

    ajax.put(url, { "id": u, "status": 1 })
      .subscribe(val => {
        console.log("Put call successful value returned in body", val);
        this.getdata();

      },
        error => {
          console.log("Put call in error", error);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

  //删除功能
  delete(i) {

    const u = this.listOfData[i].id;
    console.log(u);
    const url = '/apidata/a/u/article/' + u;

    ajax.delete(url)
      .subscribe(val => {
        console.log("Delet call successful value returned in body", val);
        this.getdata();
        //this.listOfData.splice(i, 1);
      },
        error => {
          console.log("Delet call in error", error);
        },
        () => {
          console.log("The Delet observable is now completed.");
        });
  }

  //根据页数，获得article列表

  getdata() {

    console.log("pageindex:" + this.pageindex);

    const url = '/apidata/a/article/search/';
    const params = new HttpParams()
      .set('page', this.pageindex);
    const jump = this.http.get(url, { params });
    jump.subscribe((date: any) => {
      console.log(date);
      this.listOfData = date.data.articleList;
    }, err => {
      console.log(err);
    });
  }

  //页数，获取列表
/*   thispage() {
    const url = '/apidata/a/article/search/';
    const params = new HttpParams().set('page', this.pageindex);
    const jump = this.http.get(url, { params });
    jump.subscribe((date: any) => {

      this.listOfData = date.data.articleList;
      this.total = date.data.total;
    }, err => {
      console.log(err);
    });
  } */





  // 搜索功能
  search() {
    let startTime = (new Date(this.startValue)).getTime();
    let endTime = (new Date(this.endValue)).getTime();


    ((startTime).toString()) == '0' ? this.start = '' : this.start = (startTime).toString();

    ((endTime).toString()) == '0' ? this.end = '' : this.end = (endTime).toString();
    console.log(startTime);
    console.log(typeof (this.startValue));


    const url = '/apidata/a/article/search/';
    const params = new HttpParams()
      .set('status', this.statusItem)
      .set('type', this.typeItem)
      .set('startAt', this.start)
      .set('endAt', this.end);

    const jump = this.http.get(url, { params });
    jump.subscribe((date: any) => {
      console.log(date);
      this.listOfData = date.data.articleList;
      this.total = date.data.total;
    }, err => {
      console.log(err);
    });

  }

  // 清空功能
  clear() {
    this.typeItem = '';
    this.statusItem = '';
    this.startValue = null;
    this.endValue = null;
  }


  ngOnInit() {
    this.pageindex='1';
    this.getdata();

  }
  ngDoCheck() {
    //this.getdata();
    if (this.pageindex !== this.oldPageindex) {
      console.log(`你从${this.oldPageindex}改成${this.pageindex}`);
      this.oldPageindex = this.pageindex;
      this.getdata();
    } else {
      this.counts = this.counts + 1;
      console.log("没有任何改变地调用了" + this.counts + "次");
    }





  }

}
