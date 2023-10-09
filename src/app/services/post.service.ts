import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpRequestState, HttpRequestStates } from '../models/http-request-state';
import { ArchiveLink } from '../models/archive-link';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {

  constructor(private http: HttpClient) {}

  loadAllPosts(): Observable<HttpRequestState<Post[]>> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }

  loadFilteredPosts(query: any): Observable<HttpRequestState<Post[]>> {
    const options = {
      params: new HttpParams({ fromObject: query })
    };

    return this.http.get<Post[]>(`${environment.apiUrl}/posts`, options)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }

  getPostById(postId: number): Observable<HttpRequestState<Post>> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }

  getPostCategories(): Observable<HttpRequestState<string[]>> {
    return this.http.get<string[]>(`${environment.apiUrl}/posts/categories`)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }

  loadArchiveLinks(): Observable<HttpRequestState<ArchiveLink[]>> {
    return this.http.get<ArchiveLink[]>(`${environment.apiUrl}/posts/archive-links`)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }
}
