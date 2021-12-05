import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regisForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  constructor(private form:FormBuilder, private router:Router,private service:RegisterService) { }

  ngOnInit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.regisForm = this.form.group({
      userName:['',[Validators.required,Validators.pattern('[a-z0-9]{4,}')]],
      password:['',[Validators.required,Validators.pattern('[a-z0-9]{4,}')]],
      role:['',[Validators.required,Validators.pattern('USER|ADMIN')]]
    });
  }

  registerUser(){
    this.errorMessage = null;
    this.successMessage = null;
    console.log(this.regisForm.value);
    this.service.register(this.regisForm.value).subscribe(
      success => this.successMessage = success,
      error => this.errorMessage = "User Exist in DB!!"
    );
    
  }

}
