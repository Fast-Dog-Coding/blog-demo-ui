import { Component, Input } from '@angular/core';
import { PostWithAuthor } from '../../../models/post-with-author';

@Component({
  selector: 'app-post-hero-display',
  templateUrl: './post-hero-display.component.html',
  styleUrls: ['./post-hero-display.component.css']
})
export class PostHeroDisplayComponent {

  @Input() heroPostData: PostWithAuthor | undefined

}
