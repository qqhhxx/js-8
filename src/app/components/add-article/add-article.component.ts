import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.less']
})
export class AddArticleComponent implements OnInit {

  editForm = this.fb.group({
    type: [''],
    title: [''],
    url: ['']

  });

  fileToUpload: File = null;
  size = '';
  imgsrc: string;



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    (<HTMLInputElement>document.querySelector('.progress-item')).style.width = '0';
  }




  choose() {

    let fileElem = document.getElementById("fileElem");

    if (fileElem) {
      fileElem.click();
    }

    console.log(this.editForm);

  }

  handleFileInput($event) {
    console.log($event);
    this.fileToUpload = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = function (e) {
      const image = new Image();
      image.src = (e.target as any).result;
      image.id = 'preview';
      image.style.width = '100px';
      image.style.height = '100%';
      image.style.marginTop = '20px';
      const body = document.getElementById('fileinfo');
      body.appendChild(image);
    };
    reader.onerror = function (e) {
      console.log('there is an error!')
    };


  }

  postimage() {
    this.imgsrc = '';



    const oData = new FormData();


    oData.append('file', this.fileToUpload);
    const url = './apidata/a/u/img/task';
    const client = new XMLHttpRequest();
    client.open("POST", url);


    client.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        let total: number = e.total;
        let loaded: number = e.loaded;
        let pct: number = loaded / total;
        let percentage = parseFloat(pct.toFixed(2)) * 100;
        (<HTMLInputElement>document.querySelector('.progress-item')).style.width = (percentage * 1.2) + 'px';
        (<HTMLInputElement>document.querySelector('.progress-number')).innerHTML = percentage + '%';

      }
    }



    client.onload = function (e) {
      if (this.status == 200 || this.status == 304) {
        console.log(this.response);

        var imgsrc = JSON.parse(this.response).data.url;
        console.log(imgsrc);

        





      } else {
        console.log("err");
      }
    };



    client.send(oData);

    console.log(this.imgsrc);
  




  }



  online() {


    let url = '/apidata/a/u/article/';


    let apiData = ajax.post(url, {


      "author": "admin",
      "content": "新增",
      "createAt": 1561430938067,
      //"createBy": 2,

     "img": this.imgsrc,
      "order": "",
      "publishat": 1561709919231,
      "source": "",
      "status": 1,
      "summary": "",
      "title": "新增",
      "type": 1,
      "updateAt": 1561712136698,
      "updateBy": 2,
      "url": "我的",
      "industry": 2



    });
    apiData.subscribe(
      val => {
        console.log("PUT call successful value returned in body",
          val);

      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );
  }
}
