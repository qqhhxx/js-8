import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {





  constructor(private http: HttpClient, private router: ActivatedRoute) {

    fileToUpload: File = null;



  }


  getConfig() {

    const url = '/apidata/a/article/search';
    const params = new HttpParams()
      .set('title', '2131')
      .set('type', '1');
    return this.http.get(url, { params });

  }

  getConfig2() {

    const url = '/apidata/a/article/search/';
    const params = new HttpParams()
    .set('page', '2');
   

    return this.http.get(url, { params });

  }

 






}
