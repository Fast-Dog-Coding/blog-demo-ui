import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PostsStore } from '../store/posts.store';
import { UsersStore } from '../store/users.store';
import { PostWithAuthor } from '../models/post-with-author';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  private loadingSub = new BehaviorSubject<boolean>(true);

  data$: Observable<PostWithAuthor | null> | undefined;
  loading$: Observable<boolean> = this.loadingSub.asObservable();

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
        tap(_ => this.loadingSub.next(false)),
        filter(post => !!post),
        switchMap(post => {
            return this.usersStore.getUserById(post.authorId)
              .pipe(
                filter(user => !!user),
                map(author => ({ post, author })),
              );
          }
        )
      );

    this.data$.subscribe();
  }
}
