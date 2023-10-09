import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { PromotionLevels } from '../../models/post';
import { PostWithAuthor } from '../../models/post-with-author';
import { processPost, processPosts } from '../../shared/utils';
import { HttpRequestState } from '../../models/http-request-state';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: [ './features.component.css' ]
})
export class FeaturesComponent implements OnInit {

  heroPostRequestData$: Observable<HttpRequestState<PostWithAuthor>> = of({ isLoading: true });
  featurePostsRequestData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    // Get 1 hero post (with author info) to show in the feature section of home page
    this.heroPostRequestData$ = this.postService.loadFilteredPosts({ promotion: PromotionLevels.Hero })
      .pipe(
        switchMap(postsRequest => {
          return of({ ...postsRequest, value: postsRequest.value?.pop() });
        }),
        processPost(this.userService)
      );

    // Get 2 feature posts (with author info) to show in the feature section of home page
    this.featurePostsRequestData$ = this.postService.loadFilteredPosts({ promotion: PromotionLevels.Feature })
      .pipe(processPosts(this.userService, 2));
  }
}
