import { Injectable } from '@angular/core';
import { IUser } from '../_models/IUser';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from 'src/app/_servcies/login.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../_servcies/user.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '_services/alertify.service';

@Injectable()
export class MemberEditResolver implements Resolve<IUser> {
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private alertifySerivce: AlertifyService,
    private router: Router
  ) {}

  resolve(activatedRoute: ActivatedRouteSnapshot): Observable<IUser> {

    return this.userService
      .getUser(this.loginService.decodedToken.nameid)
      .pipe(
        catchError((err) => {
          this.alertifySerivce.error(err);
          this.router.navigate(['/members']);
          return of(null);
        })
      );
  }
}
