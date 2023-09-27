import { Component, Input } from '@angular/core';
import { PostWithAuthor } from '../../../models/post-with-author';

@Component({
  selector: 'app-post-sidebar-display',
  templateUrl: './post-sidebar-display.component.html',
  styleUrls: ['./post-sidebar-display.component.css']
})
export class PostSidebarDisplayComponent {

  @Input() postData: PostWithAuthor | undefined

}
