import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from'@angular/common/http';
import {Booking} from './Booking'


@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private bookingURL = 'http://localhost:8080/bookings/byuser';
  private addVehicleURL = 'http://localhost:8080/vehicle-api/addVehicle';
  private updateVehicleURL = 'http://localhost:8080/vehicle-api/updateVehicle';
  private getCountURL = 'http://localhost:8080/vehicle-api';
  private deleteVehicleURL = 'http://localhost:8080/vehicle-api/deleteVehicle';

  constructor(private http: HttpClient) {

  }

  getBooking(userName): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.bookingURL+ "/" + userName);
  }

  addVehicle(details): Observable<any>{
    return this.http.post(this.addVehicleURL,details,{responseType:'text'});
  }

  updateVehicle(details):Observable<any>{
    return this.http.post(this.updateVehicleURL,details,{responseType:'text'});
  }

  getCount(vecName) : Observable<any>{
    return this.http.get(this.getCountURL+ "/" + vecName,{responseType:'text'});
  }

  deleteVehicle(vehName) : Observable<any>{
    return this.http.delete(this.deleteVehicleURL+ "/" + vehName,{responseType:'text'});
  }

}
