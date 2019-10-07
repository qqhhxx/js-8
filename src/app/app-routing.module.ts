import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ArticleComponent } from './components/article/article.component';
import { EditComponent } from './components/edit/edit.component';

import { ArticleListComponent } from './components/article-list/article-list.component';

import { AddArticleComponent } from './components/add-article/add-article.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'article', component: ArticleComponent,
    children: [
      {
        path: 'welcome', component: WelcomeComponent
      },
      {
        path: 'articlelist', component: ArticleListComponent
      },
      {
        path: 'edit/:id', component: EditComponent
      },
      {
        path: 'add', component: AddArticleComponent
      }
    ]
  },

{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
