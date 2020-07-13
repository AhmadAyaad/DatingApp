import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IUser } from '../_models/IUser';
import { UserService } from '../_servcies/user.service';
import { AlertifyService } from '_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<IUser[]> {
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser[]> {
    return this.userService.getUsers().pipe(
      catchError((error) => {
        this.alertifyService.error('error for loading data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
  //   resolve(activatedRoute: ActivatedRouteSnapshot): Observable<IUser> {
  //     return this.userService.getUser(activatedRoute.params['id']).pipe(
  //       catchError((err) => {
  //         this.alertifyService.error('problem loading data');
  //         this.router.navigate(['/members']);
  //         return of(null);
  //       })
  //     );
  //   }
}
