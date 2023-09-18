import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostWithAuthor } from '../../models/post-with-author';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { PromotionLevels } from '../../models/post';
import { processPosts } from '../../shared/utils';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postData$: Observable<PostWithAuthor[]> = of([] as PostWithAuthor[]);

  constructor(
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    // Get 3 posts (with author info) to show on main section of home page
    this.postData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Main })
      .pipe(processPosts(this.usersStore, 3));
  }

}
