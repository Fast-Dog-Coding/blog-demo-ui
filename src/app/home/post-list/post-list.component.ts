import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostWithAuthor } from '../../models/post-with-author';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { PromotionLevels } from '../../models/post';
import { processPosts } from '../../shared/utils';
import { HttpRequestState } from '../../models/http-request-state';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [ './post-list.component.css' ]
})
export class PostListComponent implements OnInit {

  postRequestData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });
  errorMessage = 'Sorry, there does not appear to be any posts.';

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  /**
   * When the component is initialized, retrieves 3 posts (with author
   * information) to display on the main section of the home page.
   *
   * @return {void}
   */
  ngOnInit(): void {
    this.postRequestData$ = this.postService.loadFilteredPosts({ promotion: PromotionLevels.Main })
      .pipe(processPosts(this.userService, 3));
  }
}
