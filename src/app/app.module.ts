import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeaturesComponent } from './home/features/features.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './home/post-list/post-list.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { PostsFilteredComponent } from './posts-filtered/posts-filtered.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    PostListComponent,
    SideBarComponent,
    PostsFilteredComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
