import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginService } from 'src/app/_servcies/login.service';
import { AlertifyService } from '_services/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class AtuhGuard implements CanActivate {
  constructor(
    private loginSerivce: LoginService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginSerivce.isLoggedIn()) return true;

    this.alertifyService.error('can not access');
    this.router.navigate(['/home']);
    return false;
  }
}
