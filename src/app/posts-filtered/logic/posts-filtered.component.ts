import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PostWithAuthor } from '../../models/post-with-author';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { processPosts } from '../../shared/utils';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestState } from '../../store/http-request-state';

@Component({
  selector: 'app-posts-filtered',
  templateUrl: './posts-filtered.component.html',
  styleUrls: [ './posts-filtered.component.css' ]
})
export class PostsFilteredComponent implements OnInit {

  filteredPostsRequestData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });

  constructor(
    private route: ActivatedRoute,
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    // Watch for changes in the query and then update the posts
    this.filteredPostsRequestData$ = this.route.queryParams
      .pipe(
        switchMap(query => this.postsStore.loadFilteredPosts(query)),
        processPosts(this.usersStore)
      );
  }
}
