import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostWithAuthor } from '../../models/post-with-author';
import { ArchiveLink } from '../../models/archive-link';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { PromotionLevels } from '../../models/post';
import { processPosts } from '../../shared/utils';
import { HttpRequestState } from '../../models/http-request-state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.css' ]
})
export class SideBarComponent implements OnInit {

  archiveLinkRequest$: Observable<HttpRequestState<ArchiveLink[]>> = of({ isLoading: true });
  sidebarPostRequest$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true });
  errorMessage = 'Sorry, there does not appear to be any recent posts.';

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get 3 posts (with author info) to show on main section of home page
    this.sidebarPostRequest$ = this.postService.loadFilteredPosts({ promotion: PromotionLevels.Side_Bar })
      .pipe(processPosts(this.userService, 3));

    // Get the archive links
    this.archiveLinkRequest$ = this.postService.loadArchiveLinks();
  }
}
