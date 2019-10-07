

registerLocaleData(zh);import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';





import { ReactiveFormsModule } from '@angular/forms';

// config angular i18n
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';

import { MenuLeftComponent } from './components/menu-left/menu-left.component';
import { TypePipe } from './pipes/type.pipe';
import { SearchComponent } from './components/search/search.component';
import { StatusPPipe } from './pipes/status-p.pipe';

import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ArticleListComponent } from './components/article-list/article-list.component';


import { MenuHeadComponent } from './components/menu-head/menu-head.component';
import { DataService } from './services/data.service';
import { GlobalService } from './services/global.service';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { WelcomeComponent } from './components/welcome/welcome.component';




@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    LoginComponent,
    EditComponent,
    MenuLeftComponent,
    TypePipe,
    SearchComponent,
    StatusPPipe,
    SearchPipePipe,
    ArticleListComponent,
    MenuHeadComponent,
    AddArticleComponent,
    WelcomeComponent,
 




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
   
 
   
 





  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, DataService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
