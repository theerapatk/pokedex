import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${user._id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    throw new Error('Method not implemented.');
  }

  updateUser(id: string, user: User): Observable<User> {
    throw new Error('Method not implemented.');
  }

  deleteUser(id: string): Observable<User> {
    throw new Error('Method not implemented.');
  }

}
