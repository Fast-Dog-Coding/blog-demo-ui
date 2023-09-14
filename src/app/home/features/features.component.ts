import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { Post, PromotionLevels } from '../../models/post';
import { User } from '../../models/user';

interface PostData {
  post: Post;
  author: User;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: [ './features.component.css' ]
})
export class FeaturesComponent implements OnInit {

  heroData$: Observable<PostData> = of({} as PostData);
  featureData$: Observable<PostData[]> = of([] as PostData[]);

  constructor(
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    this.heroData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Hero })
      .pipe(
        // Sort posts, newest on top
        map(posts => posts
          .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
        ),
        // Get the top one (most recent)
        map(sortedPosts => sortedPosts[0]),
        // Get the author
        switchMap(post => this.usersStore.getUserById(post.authorId)
          .pipe(
            map(author => ({ post, author }))
          )
        )
      );

    this.featureData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Feature })
      .pipe(
        // Sort posts, newest on top
        map(posts => posts
          .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
        ),
        // Get the top 2 (most recent)
        map(sortedPosts => sortedPosts.slice(0, 2)),
        // For each, get the author
        switchMap(posts =>
          forkJoin(
            posts.map(post =>
              this.usersStore.getUserById(post.authorId)
                .pipe(
                  map(author => ({ post, author })) // get the author for each post
                )
            )
          )
        )
      );
  }
}
