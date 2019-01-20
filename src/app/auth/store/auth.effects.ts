import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from './auth.action';
import { from } from 'rxjs/';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    @Effect()

    authSignUp = this.actions$.pipe(
      ofType(AuthActions.TRY_SIGNUP))
      .map((action: AuthActions.Trysignup)=> {
          return action.payload;
      })
      .switchMap((authData:{username : string, password : string})=>
    {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));       
    })
    .switchMap(()=> {
        return from(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string)=>{
        return [
            {
                type : AuthActions.SIGNUP
            },
            {
                type:AuthActions.SET_TOKEN,
                payload: token
            }
     ];

    })
    constructor(private router : Router,private actions$: Actions){

    }
}