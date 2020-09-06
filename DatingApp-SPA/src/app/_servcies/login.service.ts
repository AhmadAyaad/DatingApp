import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginUrl, registerUrl } from 'config/api';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { NgxGalleryThumbnailsComponent } from 'ngx-gallery-9';
import { IUser } from '../_models/IUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser;
  photoUrl = new BehaviorSubject<string>('../../assets/16.1 user.png.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl) {
    this.photoUrl.next(photoUrl);
    console.log(this.photoUrl);
  }


  login(userData) {
    return this.http.post(loginUrl, userData).pipe(
      map((response: any) => {
        const user = response;
        if (user) {

          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.userToReturn));

          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.userToReturn;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user:IUser) {
    return this.http.post(registerUrl, user);
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
