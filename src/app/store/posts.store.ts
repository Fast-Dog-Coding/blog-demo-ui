import { Injectable, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { handleError } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class PostsStore implements OnInit {

  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadAllPosts()
      .subscribe();
  }

  loadAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
      .pipe(
        catchError(error => handleError(error, [])),
        tap(posts => this.postsSubject.next(posts)),
        shareReplay()
      );
  }

  loadFilteredPosts(query: any): Observable<Post[]> {
    const options = {
      params: new HttpParams({ fromObject: query })
    };
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`, options)
      .pipe(
        catchError(error => handleError(error, [])),
        tap(posts => this.postsSubject.next(posts)),
        shareReplay()
      );
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`)
      .pipe(
        catchError(error => handleError<Post>(error)),
        shareReplay()
      );
  }

  getPostCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/posts/categories`)
      .pipe(
        catchError(error => handleError(error, [])),
        shareReplay()
      );
  }
}
