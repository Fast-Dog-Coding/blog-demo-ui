import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { HttpRequestState, HttpRequestStates } from '../models/http-request-state';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  loadAllUsers(): Observable<HttpRequestState<User[]>> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }

  getUserById(userId: number): Observable<HttpRequestState<User>> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`)
      .pipe(
        HttpRequestStates(),
        shareReplay()
      );
  }
}
