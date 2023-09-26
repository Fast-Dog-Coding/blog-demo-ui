import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { PostWithAuthor } from '../../models/post-with-author';
import { processPost } from '../../shared/utils';
import { HttpRequestState } from '../../store/http-request-state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  data$: Observable<HttpRequestState<PostWithAuthor>> = of({ isLoading: true });

  constructor(
    private router: ActivatedRoute,
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    const postId = parseInt(<string>this.router.snapshot.paramMap.get('postId'), 10);

    this.data$ = this.postsStore.getPostById(postId)
      .pipe(
        processPost(this.usersStore)
      );
  }
}
