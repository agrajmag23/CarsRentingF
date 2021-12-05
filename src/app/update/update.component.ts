import { Component, OnInit } from '@angular/core';
import { Booking } from './Booking';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateService } from './update.service';
import { TouchSequence } from 'selenium-webdriver';
import {Router} from '@angular/router';
import  {HostListener} from '@angular/core';
import {ShareIdService} from '../share-id.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  bookingsForm: FormGroup;
  errorMessageBookings: string;

  addVehicleForm: FormGroup;
  errorMessageAdding: string;
  successMessageAdding: string;

  updateVehicleForm: FormGroup;
  errorMessageUpdate: string;
  successMessageUpdate: string;

  getCountForm: FormGroup;
  errorMessageCount: string;
  successMessageCount: string;

  deleteVehicleForm: FormGroup;
  errorMessageDelete: string;
  successMessageDelete: string;

  bookings: Booking[];
  constructor(private form:FormBuilder,private updateService: UpdateService,private router:Router,private shareId : ShareIdService) {
    console.log(this.shareId.getCheck())
    if(this.shareId.getCheck()){
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.errorMessageBookings = null;
    this.bookingsForm = this.form.group({
      userName:['',[Validators.required,Validators.pattern('(\\w|\-){3,}')]]
    });

    this.errorMessageAdding = null;
    this.successMessageAdding = null;
    this.addVehicleForm = this.form.group({
      vehicleType:['',[Validators.required,Validators.pattern('(\\w|\-){3,}')]],
      count:['',[Validators.required,Validators.min(1)]]
    })

    this.errorMessageUpdate= null;
    this.successMessageUpdate = null;
    this.updateVehicleForm = this.form.group({
      vehicleType:['',[Validators.required,Validators.pattern('(\\w|\-){3,}')]],
      count:['',[Validators.required,Validators.min(1)]]
    })

    this.errorMessageCount = null;
    this.successMessageCount = null;
    this.getCountForm = this.form.group({
      vName:['',[Validators.required,Validators.pattern('(\\w|\-){3,}')]]
    });


    this.errorMessageDelete = null;
    this.successMessageDelete = null;
    this.deleteVehicleForm = this.form.group({
      vName:['',[Validators.required,Validators.pattern('(\\w|\-){3,}')]]
    });
  }

  @HostListener('window:popstate',['$event'])
  onpopstate(event){
    console.log('Back/Forward Button Pressed')
    this.router.navigate(['/home']);
  }

  getBookings(){
    this.bookings = null;
    this.errorMessageBookings = null;
    this.updateService.getBooking(this.bookingsForm.get('userName').value).subscribe(
      bookings => this.bookings = bookings,
      error => {this.errorMessageBookings = (error.error.errorMessage);
        console.log(this.errorMessageBookings)
      }
    );
  }

  addVehicle(){
    this.errorMessageAdding = null;
    this.successMessageAdding = null;
    this.updateService.addVehicle(this.addVehicleForm.value).subscribe(
      success => this.successMessageAdding = success,
      error => {let obj = JSON.parse(error.error);
          this.errorMessageAdding = obj.errorMessage;
      }
    )
  }

  updateVehicle(){
    this.successMessageUpdate = null;
    this.errorMessageUpdate = null;
    this.updateService.updateVehicle(this.updateVehicleForm.value).subscribe(
      success => this.successMessageUpdate = success,
      error => {let obj = JSON.parse(error.error);
          this.errorMessageUpdate = obj.errorMessage;
      }
    )
  }

  getCount(){
    this.errorMessageCount = null;
    this.successMessageCount = null;
    this.updateService.getCount(this.getCountForm.get('vName').value).subscribe(
      success =>  this.successMessageCount = "Count :" + success,
      error => {let obj = JSON.parse(error.error);
        this.errorMessageCount = obj.errorMessage;
      }
    );
  }

    deleteVehicle(){
      this.errorMessageDelete = null;
      this.successMessageDelete = null;
      this.updateService.deleteVehicle(this.deleteVehicleForm.get('vName').value).subscribe(
        success =>  this.successMessageDelete = success,
        error => {let obj = JSON.parse(error.error);
          this.errorMessageDelete = obj.errorMessage;
        }
      );
    }
    
    logout(){
      this.shareId.setCheck(false);
      this.router.navigate(['/home']);
    }
  }



