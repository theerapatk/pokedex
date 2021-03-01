import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, user);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/users/${id}`);
  }

}
