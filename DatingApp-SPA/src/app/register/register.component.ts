import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../_servcies/login.service';
import { AlertifyService } from '_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData: any = {};
  @Output() cancelRegisterationEvent = new EventEmitter();
  constructor(
    private loginService: LoginService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {}

  register() {
    this.loginService.register(this.userData).subscribe(
      (res) => {
        // console.log('successssss');
        this.alertifyService.success('Registeration Successful');
      },
      (err) => { 
        // console.log(err);
        this.alertifyService.error(err);
      }
    );
  }
  cancelRegisteration() {
    this.cancelRegisterationEvent.emit(false);
  }
}
