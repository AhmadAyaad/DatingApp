import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_servcies/login.service';
import { AlertifyService } from '_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser;
  photoUrl;
  
  
  constructor(
    public loginService: LoginService,
    private alterifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.photoUrl);
    this.currentUser = this.loginService.currentUser;
    this.loginService.currentPhotoUrl.subscribe(url=>this.photoUrl=url);
    console.log(this.photoUrl);
  }

  login() {
    this.loginService.login(this.model).subscribe(
      (res) => {
        this.alterifyService.success('logged in successfully');
      },
      (err) => {
        this.alterifyService.error(err);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  isLogedIn() {
    return this.loginService.isLoggedIn();
    // const token = localStorage.getItem('token');
    // if (token) return true;
    // return false;
    // retrun !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.alterifyService.message('You are logged out');
    this.router.navigate(['/home']);
  }
}
