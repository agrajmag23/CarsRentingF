import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Login } from './Login';
import {ShareIdService} from '../share-id.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  // check :boolean;

  // userId:number;
  // userName2:string;

  public loginDetails;

  constructor(private form:FormBuilder, private service:LoginService,private router:Router, private shareId:ShareIdService) {
  
  }

  ngOnInit(): void {
    this.errorMessage = null;
    // this.userId = null;
    this.loginForm = this.form.group({
      userName:['',[Validators.required,Validators.pattern('[a-z0-9]{4,}')]],
      password:['',[Validators.required,Validators.pattern('[a-z0-9]{5,}')]],
      role:['',[Validators.pattern('USER|ADMIN')]]
    });
  }


  loginUser(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.get('userName').value).subscribe(
      success => {
        this.loginDetails = success; 
        console.log(this.loginDetails);
        console.log();
        if(this.loginDetails.password == this.loginForm.get('password').value && this.loginDetails.role == this.loginForm.get('role').value){
          // this.check = true;
          // console.log(this.check);
          if(this.loginDetails.role == "ADMIN"){
            this.shareId.setCheck(true);
            this.router.navigate(['update']);
          }
          else{
            this.router.navigate(['book']);
            this.shareId.setId(this.loginDetails.id);
            this.shareId.setCheck(true);
            this.shareId.setUserName(this.loginDetails.userName);
          }
        }
        else
          this.errorMessage = " Invalid Credentails !!";
      },
      error => this.errorMessage = error.error.errorMessage
    )

  }

}
