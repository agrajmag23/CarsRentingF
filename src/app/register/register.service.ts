import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private detailsURL = 'http://localhost:8080/register';
  constructor(private http:HttpClient) { }

  register(registerDetails): Observable<any>{
    console.log(registerDetails);
    return this.http.post(this.detailsURL,registerDetails,{responseType:'text'});
  }
}
