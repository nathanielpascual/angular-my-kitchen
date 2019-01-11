import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate, CanLoad{

    constructor(private authService: AuthService,
                private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated();
    }

    // canLoad(route: Route) {
    //     return this.authService.isAuthenticated();
    // }
    canLoad(route: Route) {
      return this.authService.isAuthenticated();
    }
}