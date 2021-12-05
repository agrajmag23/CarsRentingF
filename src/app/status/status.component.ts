import { Component, OnInit } from '@angular/core';
import { Status } from './Status';
import { StatusService } from './status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status: Status[];
  errorMessage: string;

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.getStatus();
    console.log(this.status);
  }

  getStatus(){
    this.statusService.getStatus().subscribe(
      status => this.status = status,
      error => this.errorMessage = <any>error
    );
  }

}
