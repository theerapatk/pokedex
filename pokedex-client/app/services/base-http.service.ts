import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {

  readonly url = `${environment.apiUrl}`;

  constructor(protected http: HttpClient) { }

}
