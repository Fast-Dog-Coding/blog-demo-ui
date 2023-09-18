import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostsStore } from '../store/posts.store';
import { UsersStore } from '../store/users.store';
import { PostWithAuthor } from '../models/post-with-author';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  data$: Observable<PostWithAuthor | null> | undefined;

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
        filter(post => !!post),
        switchMap(post => {
            return this.usersStore.getUserById(post.authorId)
              .pipe(
                map(author => ({ post, author })),
              );
          }
        )
      );
  }
}
