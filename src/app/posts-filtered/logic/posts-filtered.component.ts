import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil, switchMap } from 'rxjs/operators';
import { BreadCrumb } from '../../models/bread-crumb';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpRequestState } from '../../models/http-request-state';
import { PostWithAuthor } from '../../models/post-with-author';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { processPosts } from '../../shared/utils';

/**
 * Component for displaying filtered posts and breadcrumbs.
 */
@Component({
  selector: 'app-posts-filtered',
  templateUrl: './posts-filtered.component.html',
  styleUrls: [ './posts-filtered.component.css' ]
})
export class PostsFilteredComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  filteredPostsRequestData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });
  breadcrumbs$: Observable<BreadCrumb[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.filteredPostsRequestData$ = this.route.queryParams.pipe(
      switchMap(query => this.postService.loadFilteredPosts(query)),
      processPosts(this.userService),
      takeUntil(this.destroy$)
    );

    this.breadcrumbs$ = this.filteredPostsRequestData$.pipe(
      map(_ => this.setBreadcrumbs(this.route.snapshot.queryParams))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setBreadcrumbs(query: Params): BreadCrumb[] {
    const firstParam = Object.entries(query).shift();

    if (firstParam) {
      const [ key, value ] = firstParam;
      return [
        { label: 'home', path: '/' },
        { label: `${key}: ${value}`, path: '' }
      ];
    }

    return [];
  }
}
