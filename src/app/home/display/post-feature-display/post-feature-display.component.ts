import { Component, Input } from '@angular/core';
import { PostWithAuthor } from '../../../models/post-with-author';

@Component({
  selector: 'app-post-feature-display',
  templateUrl: './post-feature-display.component.html',
  styleUrls: ['./post-feature-display.component.css']
})
export class PostFeatureDisplayComponent {

  @Input() featurePostData: PostWithAuthor | undefined

}
