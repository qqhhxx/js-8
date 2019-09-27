

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TypePipe } from '../../pipes/type.pipe';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {

  listOfData: any[] = [];



  constructor(private http: HttpClient) {





  }






  ngOnInit() {


  }













}
