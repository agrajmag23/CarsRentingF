import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from'@angular/common/http';
import {Status} from './Status';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusURL = 'http://localhost:8080/vehicle-api/vehicles'
  constructor(private http: HttpClient) { }

  getStatus(): Observable<Status[]>{
    return this.http.get<Status[]>(this.statusURL);
  }
}
