import { Component, Input } from '@angular/core';
import { PostWithAuthor } from '../../../models/post-with-author';

@Component({
  selector: 'app-post-filtered-display',
  templateUrl: './post-filtered-display.component.html',
  styleUrls: ['./post-filtered-display.component.css']
})
export class PostFilteredDisplayComponent {

  @Input() postData: PostWithAuthor | undefined

}
