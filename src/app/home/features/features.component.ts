import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { PromotionLevels } from '../../models/post';
import { PostWithAuthor } from '../../models/post-with-author';
import { processPost, processPosts } from '../../shared/utils';
import { HttpRequestState } from '../../store/http-request-state';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: [ './features.component.css' ]
})
export class FeaturesComponent implements OnInit {

  heroPostRequestData$: Observable<HttpRequestState<PostWithAuthor>> = of({ isLoading: true });
  featurePostsRequestData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });

  constructor(
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    // Get 1 hero post (with author info) to show in the feature section of home page
    this.heroPostRequestData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Hero })
      .pipe(
        switchMap(postsRequest => {
          return of({ ...postsRequest, value: postsRequest.value?.pop() });
        }),
        processPost(this.usersStore)
      );

    // Get 2 feature posts (with author info) to show in the feature section of home page
    this.featurePostsRequestData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Feature })
      .pipe(processPosts(this.usersStore, 2));
  }
}
