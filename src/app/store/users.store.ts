import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersStore implements OnInit {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadAllUsers()
      .subscribe();
  }

  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(
        tap(users => this.usersSubject.next(users)),
        shareReplay()
      );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`)
      .pipe(
        shareReplay()
      );
  }
}
