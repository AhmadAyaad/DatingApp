import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IUser } from '../_models/IUser';
import { UserService } from '../_servcies/user.service';
import { AlertifyService } from '_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailsResolver implements Resolve<IUser> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}
  resolve(activatedRoute: ActivatedRouteSnapshot): Observable<IUser> {
    return this.userService.getUser(activatedRoute.params['id']).pipe(
      catchError((err) => {
        this.alertifyService.error('problem loading data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
