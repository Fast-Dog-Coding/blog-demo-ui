import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './shared/display/error/error.component';
import { FeaturesComponent } from './home/features/features.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './post/logic/post.component';
import { PostDisplayComponent } from './post/display/post-display.component';
import { PostListComponent } from './home/post-list/post-list.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { PostsFilteredComponent } from './posts-filtered/posts-filtered.component';
import { ImagePathPipe } from './shared/pipes/image-path.pipe';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { PostLoadingComponent } from './shared/display/post-loading/post-loading.component';
import { PostHeroDisplayComponent } from './home/display/post-hero-display/post-hero-display.component';
import { PostFeatureDisplayComponent } from './home/display/post-feature-display/post-feature-display.component';
import { PostSidebarDisplayComponent } from './home/display/post-sidebar-display/post-sidebar-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    FeaturesComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    PostDisplayComponent,
    PostListComponent,
    SideBarComponent,
    PostsFilteredComponent,
    ImagePathPipe,
    SafeHtmlPipe,
    PostLoadingComponent,
    PostHeroDisplayComponent,
    PostFeatureDisplayComponent,
    PostSidebarDisplayComponent
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
