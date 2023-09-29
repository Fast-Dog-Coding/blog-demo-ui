import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { PostWithAuthor } from '../../models/post-with-author';
import { processPost } from '../../shared/utils';
import { HttpRequestState } from '../../store/http-request-state';
import { BreadCrumb } from '../../models/bread-crumb';
import { PreviousRouteService } from '../../services/previous-route.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  private breadcrumbsSubject: BehaviorSubject<BreadCrumb[]> = new BehaviorSubject<BreadCrumb[]>([]);

  postRequestData$: Observable<HttpRequestState<PostWithAuthor>> = of({ isLoading: true });
  breadcrumbs$: Observable<BreadCrumb[]> = this.breadcrumbsSubject.asObservable();

  constructor(
    private router: ActivatedRoute,
    private previousRoute: PreviousRouteService,
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    const postId = parseInt(<string>this.router.snapshot.paramMap.get('postId'), 10);

    this.postRequestData$ = this.postsStore.getPostById(postId)
      .pipe(processPost(this.usersStore));

    this.postRequestData$
      .subscribe({ next: (postData) => this.setBreadcrumbs(postData) });
  }

  composeBreadcrumb(previousUrl: string): BreadCrumb {
    const [ path, queryString = '' ] = previousUrl.split('?');
    const [ type = '', value = '' ] = queryString.split('=');
    const label = `${decodeURI(type)}: ${decodeURI(value)}`;
    const query = { [type]: decodeURI(value) };

    return { label, path, query };
  }

  setBreadcrumbs(postData: HttpRequestState<PostWithAuthor>): void {
    const post = postData.value?.post;
    const previousUrl = this.previousRoute?.getPreviousUrl();
    const breadcrumbs: BreadCrumb[] = [
      { label: 'Home', path: '/' }
    ];

    // Skip missing or "home"
    if (previousUrl && previousUrl !== '/') {
      breadcrumbs.push(this.composeBreadcrumb(previousUrl));
    }

    if (post) {
      breadcrumbs.push({ label: post.title, path: `/posts/${post.id}` });
    }

    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
