import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareIdService {
  userId:number;
  userName:string;
  check:boolean;
  constructor() { }

  setId(id){
    this.userId = id;
  }

  getId(){
    return this.userId;
  }

  setUserName(name){
    this.userName = name;
  }

  getName(){
    return this.userName;
  }

  getCheck(){
    return this.check;
  }

  setCheck(chk){
    this.check = chk;
  }
}
