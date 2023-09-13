import { Component, OnInit } from '@angular/core';
import { PostsStore } from '../store/posts.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  categories$: any;

  constructor(private postsStore: PostsStore) {
  }

  ngOnInit() {
    this.categories$ = this.postsStore.getPostCategories();
  }
}
