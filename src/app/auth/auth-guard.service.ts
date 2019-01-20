import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{//, CanLoad{

    constructor(private store : Store<fromApp.AppState>){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
           .take(1)
           .map((authState: fromAuth.State)=>{
            console.log(authState.authenticated);
            return authState.authenticated;
        });
    }

    // canLoad(route: Route) {
    //     return this.authService.isAuthenticated();
    // }
    // canLoad(route: Route) {
    //     return this.store.select('auth').map((authState: fromAuth.State)=>{
    //         console.log(authState.authenticated);
    //         return authState.authenticated;
    //     });
    // }
}