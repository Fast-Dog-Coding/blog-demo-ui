import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostWithAuthor } from '../../models/post-with-author';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { processPosts } from '../../shared/utils';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestState } from '../../store/http-request-state';

@Component({
  selector: 'app-posts-filtered',
  templateUrl: './posts-filtered.component.html',
  styleUrls: ['./posts-filtered.component.css']
})
export class PostsFilteredComponent implements OnInit {

  filteredPostsRequestData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });

  constructor(
    private router: ActivatedRoute,
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {}

  ngOnInit(): void {
    const query = this.router.snapshot.queryParams;
    this.filteredPostsRequestData$ = this.postsStore.loadFilteredPosts(query)
      .pipe(
        processPosts(this.usersStore)
      );
  }
}
