import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable, of } from 'rxjs';
import { HttpRequestState } from '../models/http-request-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  categories$: Observable<HttpRequestState<string[]>> = of({ isLoading: true });

  constructor(private service: PostService) {}

  ngOnInit() {
    this.categories$ = this.service.getPostCategories();
  }
}
