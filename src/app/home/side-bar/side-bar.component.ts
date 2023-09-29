import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostWithAuthor } from '../../models/post-with-author';
import { ArchiveLink } from '../../models/archive-link';
import { PostsStore } from '../../store/posts.store';
import { UsersStore } from '../../store/users.store';
import { PromotionLevels } from '../../models/post';
import { processPosts } from '../../shared/utils';
import { HttpRequestState } from '../../store/http-request-state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  archiveLinkData$: Observable<HttpRequestState<ArchiveLink[]>> = of({ isLoading: true });
  sidebarPostData$: Observable<HttpRequestState<PostWithAuthor[]>> = of({ isLoading: true});

  constructor(
    private postsStore: PostsStore,
    private usersStore: UsersStore
  ) {
  }

  ngOnInit(): void {
    // Get 3 posts (with author info) to show on main section of home page
    this.sidebarPostData$ = this.postsStore.loadFilteredPosts({ promotion: PromotionLevels.Side_Bar })
      .pipe(processPosts(this.usersStore, 3));

    // Get the archive links
    this.archiveLinkData$ = this.postsStore.loadArchiveLinks()
      .pipe();
  }

}
