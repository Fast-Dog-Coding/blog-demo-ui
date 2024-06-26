import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/logic/post.component';
import { PostsFilteredComponent } from './posts-filtered/logic/posts-filtered.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'posts/filtered',
    component: PostsFilteredComponent
  },
  {
    path: 'posts/:postId',
    component: PostComponent
  },
  /*
    {
      path: 'pages/:pageId',
      component: PageComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
  */
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { scrollPositionRestoration: 'top', useHash: true }
    )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
