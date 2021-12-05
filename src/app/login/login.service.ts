import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from './Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private detailsURL = 'http://localhost:8080/login';
  constructor(private http:HttpClient) { }

  login(userName): Observable<Login>{
    // console.log(userName);
    return this.http.get<Login>(this.detailsURL+'/'+userName);
  }
}
