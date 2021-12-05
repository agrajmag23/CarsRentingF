import { Component, OnInit, Host } from '@angular/core';
import {ShareIdService} from '../share-id.service'
import {Vehicle} from './Vehicle';
import { BookService } from './book.service';
import {Booking} from './Booking';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from'@angular/common/http';
// import { identifierModuleUrl } from '@angular/compiler';
import {Router} from '@angular/router';
import  {HostListener} from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  userId:number;
  userName:string;
  vehicles: Vehicle[];
  vehicleError:string;

  bookings: Booking[];
  errorMessageBookings:string;

  reviewForm: FormGroup;
  successMessageReview: string;
  errorMessageReview: string;


  bookingForm: FormGroup;
  successMessageBooking: string;
  errorMessageBooking: string;

  PaymentForm: FormGroup;
  successMessagePayment: string;
  errorMessagePayment: string;

  cancelForm : FormGroup;
  errorMessageCancel :string;
  successMessageCancel: string;


  cities : string[];
  errorCities: string;

  private getAmountURL = 'http://localhost:8080/bookings/amount';
  private paymentURL = 'http://localhost:8080/bookings/payment';
  private getPointsURL = 'http://localhost:8080/bookings/longlat';
  private distAPI = 'https://apis.mapmyindia.com/advancedmaps/v1/6nsh8u8bh6mdtx9fhrrt9w8s3rbv2b5j/distance_matrix/driving';
  private bookURL = 'http://localhost:8080/bookings/book'

  constructor(private shareId:ShareIdService,private service:BookService, private form: FormBuilder,private http:HttpClient,private router: Router) {
    console.log(this.shareId.getCheck())
    if(this.shareId.getCheck()){
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.userId = this.shareId.getId();
    this.userName = this.shareId.getName();
    this.getVehicles();
    this.getBookings();
    this.getCities();

    this.reviewForm = this.form.group({
      bid:['',[Validators.required,Validators.min(1)]],
      rNum:['',[Validators.required,Validators.min(1),Validators.max(10)]]
    })

    this.bookingForm = this.form.group({
      vehicleName:['',[Validators.required]],
      vehicleCount:['',[Validators.required,Validators.min(1)]],
      bookingDate:['',[Validators.required]],
      source:['',Validators.required],
      destination:['',Validators.required],
      duration:['',Validators.required]
    })

    this.errorMessagePayment = null;
    this.successMessagePayment = null;

    this.PaymentForm = this.form.group({
      bid:['',[Validators.required,Validators.min(1)]],
      payment_type:['',[Validators.required]],
      payment_info:['',[Validators.required,Validators.pattern('(\\w|\@){3,}'),Validators.maxLength(16)]]
    })

    this.errorMessageCancel = null;
    this.successMessageCancel = null;

    this.cancelForm = this.form.group({
      bid:['',[Validators.required,Validators.min(1)]]
    })
  }

  @HostListener('window:popstate',['$event'])
  onpopstate(event){
    console.log('Back/Forward Button Pressed')
    this.userId = null;
    this.router.navigate(['/home']);
  }

  getVehicles(){
    this.service.getStatus().subscribe(
      vehicles => this.vehicles = vehicles,
      error => this.vehicleError = <any>error
    );
  }



  getBookings(){
    this.bookings = null;
    this.errorMessageBookings = null;
    this.service.getBooking(this.userId).subscribe(
      bookings => {this.bookings = bookings;},
      error => {this.errorMessageBookings = (error.error.errorMessage);
        console.log(this.errorMessageBookings)
      }
    );
  }


  giveReview(){
    this.errorMessageReview = null;
    this.successMessageReview = null;
    console.log(this.reviewForm.get('bid').value + " " + this.reviewForm.get('rNum').value);
    this.service.giveReview(this.reviewForm.get('bid').value,this.reviewForm.get('rNum').value,this.userId).subscribe(
      success => {
        this.successMessageReview =success;
        this.getBookings();
        this.getVehicles();
      } ,
      error => {let obj = JSON.parse(error.error);
        this.errorMessageReview = obj.errorMessage;
      }
    )
  }


  makePayment(){
    this.successMessagePayment = null;
    this.errorMessagePayment = null;
    let amount = null;
    this.http.get(this.getAmountURL + "/" + this.PaymentForm.get('bid').value).subscribe(
      success => { 
        amount = success;
        this.PaymentForm.value['amount'] = success
      },
      error => {
        this.errorMessagePayment = error.error.errorMessage;
        console.log(this.errorMessagePayment);
      },
      () => {
        if(amount != null){
          this.http.post(this.paymentURL  + "/" +  this.userId + "/" + this.PaymentForm.get('bid').value,this.PaymentForm.value,{responseType:'text'}).subscribe(
            success => {
              this.successMessagePayment =  "Payment ID: " + success + ", Payment Successful !";
              this.getBookings();
            },
            error => {let obj = JSON.parse(error.error);
              this.errorMessagePayment = obj.errorMessage;
              console.log(this.errorMessagePayment)
            }
          )
        }
      }
    )
  }

  book(){
    console.log(this.bookingForm.value);
    this.errorMessageBooking = null;
    this.successMessageBooking = null;
    var points = null;
    this.http.get(this.getPointsURL + "/" + this.bookingForm.get('source').value + "/" + this.bookingForm.get('destination').value).subscribe(
      success => {
        // console.log(success)
        points = success;
      },
      error => {
        this.errorMessageBooking = error.error.errorMessage;
        console.log(this.errorMessageBooking)
      },
      () =>{
        if(this.errorMessageBooking == null){
          console.log(points['sourceLongitude']);
          // this.http.get(this.distAPI + "/" + points['sourceLongitude'] + "," + points['sourceLatitude'] + ";" + points['destLongitude'] + "," + points['destLatitude']).subscribe(
          //   success => console.log(success),
          //   error => console.log(error)
          // )
          // var amount = 38;
          // this.bookingForm.value['amount'] = amount;
          // this.bookingForm.value['distance'] = 24;
          console.log( this.bookingForm.value)
          this.http.post(this.bookURL+"/"+this.userId,this.bookingForm.value).subscribe(
            success => {
              this.successMessageBooking = "Booking ID : " + success + " Booking Successful ! Confirm details below and do the payment !";
              this.getBookings();
              this.getVehicles();
            },
            error => {
              this.errorMessageBooking = error.error.errorMessage;
            }
          )
        }
      }

    )
  }

  getCities(){
    this.service.getCities().subscribe(
      cities => this.cities = cities,
      error => this.errorCities = <any>error
    );
  }

  cancelBooking(){
    this.successMessageCancel = null;
    this.errorMessageCancel = null;
    console.log(this.cancelForm.value);
    this.service.cancelBooking(this.cancelForm.get('bid').value,this.userId).subscribe(
      success => {this.successMessageCancel = success;
        console.log(this.successMessageCancel);
        this.getBookings();
        this.getVehicles();
      },
      error => {let obj = JSON.parse(error.error);
        this.errorMessageCancel = obj.errorMessage;
        console.log(this.errorMessageCancel)
      }
    )
  }

  logout(){
    this.userId = null;
    this.shareId.setCheck(false);
    this.router.navigate(['/home']);
  }
}

