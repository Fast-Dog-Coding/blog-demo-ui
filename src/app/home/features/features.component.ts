import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { PromotionLevels } from '../../models/post';
import { PostWithAuthor } from '../../models/post-with-author';
import { processPosts } from '../../shared/utils/post-utils';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: [ './features.component.css' ]
})
export class FeaturesComponent implements OnInit {

  heroData$: Observable<PostWithAuthor> = of({} as PostWithAuthor);
  featureData$: Observable<PostWithAuthor[]> = of([] as PostWithAuthor[]);

  constructor(
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    // Get 1 hero post (with author info) to show in the feature section of home page
    this.heroData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Hero })
      .pipe(
        processPosts(this.usersStore),
        map(processedPosts => processedPosts[0])
        );

    // Get 2 feature posts (with author info) to show in the feature section of home page
    this.featureData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Feature })
      .pipe(processPosts(this.usersStore, 2));
  }
}
