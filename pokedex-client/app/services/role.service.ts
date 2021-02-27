import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@models/role.model';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/roles`);
  }

}
