import { Component, Input } from '@angular/core';
import { PostWithAuthor } from '../../models/post-with-author';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: [ './post-display.component.css' ]
})
export class PostDisplayComponent {

  @Input() data: PostWithAuthor | undefined

}
