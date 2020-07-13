import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/_servcies/login.service';
import { UserService } from './_servcies/user.service';
import { IUser } from './_models/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(
    public loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const currentUser: IUser = JSON.parse(localStorage.getItem('user'));

    if (token)
      this.loginService.decodedToken = this.jwtHelper.decodeToken(token);

    if (currentUser)
    {
      this.loginService.currentUser = currentUser;
      this.loginService.changeMemberPhoto(currentUser.photoUrl);
    }
      

    // this.loadUsers();
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((res) => {
  //     console.log(res);
  //   });
  // }
}
