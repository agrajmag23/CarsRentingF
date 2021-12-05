import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from'@angular/common/http';
import {Vehicle} from './Vehicle'
import  {Booking} from './Booking'
import { newArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookingURL = 'http://localhost:8080/bookings';
  private vechURL = 'http://localhost:8080/vehicle-api/vehicles'
  private reviewURL = 'http://localhost:8080/bookings/review';
  private paymentURL = 'http://localhost:8080/bookings/payment';
  private getAmountURL = 'http://localhost:8080/bookings/amount';
  private citiesURL = "http://localhost:8080/bookings/cities";
  private cancelURL = 'http://localhost:8080/bookings/cancel';

  res2 = null;

  constructor(private http:HttpClient) { }

  getStatus(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.vechURL);
  }

  getBooking(userId): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.bookingURL+ "/" + userId);
  }

  giveReview(bid,rNum,userId): Observable<any>{
    console.log(this.reviewURL+ "/" + bid + "/" + rNum);
    return this.http.post(this.reviewURL+ "/" + userId+ "/" + bid + "/" + rNum,null,{responseType:'text'});
  }

  getCities(): Observable<string[]>{
    return this.http.get<string[]>(this.citiesURL);
  }

  cancelBooking(bid,userId){
    return this.http.delete(this.cancelURL+ "/" + userId + "/" + bid,{responseType:'text'});
  }

  // givePayment(bid,value){
  //   let val = null;
  //   let res = this.getAmount(bid);
  //   res.subscribe(
  //     success => {
  //       value['amount'] = success;
  //       console.log(value)
  //       this.http.post(this.paymentURL + "/" + bid,value,{responseType:'text'}).subscribe(
  //         success => this.res2 = success,
  //         error => {return error}
  //       )
  //     },
  //     error =>console.log(error));
  //   console.log();
  //   console.log("jdfbf");
  // }

  // getAmount(bid){
  //   // console.log(bid)
  //   return this.http.get(this.getAmountURL + "/" + bid);
  // }
}
