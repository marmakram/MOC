import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../user/services/auth.service';

@Injectable()
export class AuthSuperGuardService implements CanActivate {

  constructor(private userService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isValid() && this.userService.isSuperAdmin())  {
      return true;
    } else {
      this.router.navigate(['/users/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}