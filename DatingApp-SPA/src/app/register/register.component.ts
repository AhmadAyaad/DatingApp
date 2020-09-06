import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../_servcies/login.service';
import { AlertifyService } from '_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IUser } from '../_models/IUser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  user: IUser;
  registerationForm : FormGroup;

  //partial to make all props in this instance are optional
  bsConfig : Partial< BsDatepickerConfig>;
  @Output() cancelRegisterationEvent = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder,
    private router :Router
  ) {}

  ngOnInit(): void {
    
    //to change the theme of the ngx data picker 
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    
    this.createRegisterForm();
  }

  createRegisterForm(){


    // this.registerationForm = new FormGroup({
    //   userName : new FormControl('', Validators.required),
    //   password : new FormControl('', [Validators.required , Validators.minLength(4),
    //     Validators.maxLength(8)]),
    //   confirmPassword : new FormControl('' , Validators.required)
    // } , this.passwordMatchValidator);


    // da syntax sugar lly fo2 da

    this.registerationForm = this.formBuilder.group({

      gender:['male'], 
      userName : ['' , Validators.required],
      knownAs: ['' , Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['' , Validators.required],
      country: ['',Validators.required],
      password: ['', [Validators.required , Validators.minLength(4),
                   Validators.maxLength(8)]],
      confirmPassword : ['' , Validators.required]
    }, {validators: this.passwordMatchValidator})
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value
                                ? null : {'mismatch':true};
  }


  register() {

    if(this.registerationForm.valid)
    {
      this.user = Object.assign({} , this.registerationForm.value);
      this.loginService.register(this.user).subscribe(()=>{
        this.alertifyService.success("registeration successful");
      }, error=>{
        this.alertifyService.error(error);
      },()=>{
        this.loginService.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']);
        });
      });
    }
    // this.loginService.register(this.userData).subscribe(
    //   (res) => {
    //     // console.log('successssss');
    //     this.alertifyService.success('Registeration Successful');
    //   },
    //   (err) => { 
    //     // console.log(err);
    //     this.alertifyService.error(err);
    //   }
    // );

    console.log(this.registerationForm.value);
  }
  cancelRegisteration() {
    this.cancelRegisterationEvent.emit(false);
  }
}
