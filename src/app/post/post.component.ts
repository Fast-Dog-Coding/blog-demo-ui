import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsStore } from '../store/posts.store';
import { UsersStore } from '../store/users.store';
import { map, Observable, switchMap } from 'rxjs';
import { Post } from '../models/post';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

interface PostData {
  post: Post;
  author: User;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  data$: Observable<PostData> | undefined;

  constructor(
    private router: ActivatedRoute,
    private postsStore: PostsStore,
    private usersStore: UsersStore,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    const postId = parseInt(<string>this.router.snapshot.paramMap.get('postId'), 10);

    this.data$ = this.postsStore.getPostById(postId)
      .pipe(
        switchMap(post => this.usersStore.getUserById(post.authorId)
          .pipe(
            map(author => ({ post, author }))
          ))
      );
  }

  safePostBodyHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  imagePath(path: string): string {
    return `${environment.apiUrl}${path}`
  }
}
