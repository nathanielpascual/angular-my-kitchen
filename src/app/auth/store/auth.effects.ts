import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map, tap, switchMap, mergeMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import * as AuthActions from './auth.action';


@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$.pipe(
      ofType(AuthActions.TRY_SIGNUP))
      .pipe(map((action: AuthActions.Trysignup)=> {
          return action.payload;
      })
      ,switchMap((authData:{username : string, password : string})=>
      {
          return from(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));
      })
      ,switchMap(()=> {
          return from(firebase.auth().currentUser.getIdToken());
      })
      ,mergeMap((token: string)=>{
          this.router.navigate(['/']);
          return [
              {
                  type : AuthActions.SIGNUP
              },
              {
                  type:AuthActions.SET_TOKEN,
                  payload: token
              }
      ];

      }));

    @Effect()
    authSignIn = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNIN))
        .pipe(map((action: AuthActions.Trysignin)=> {
            return action.payload;
        })
        ,switchMap((authData:{username : string, password : string})=>
        {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password));
        })
        ,switchMap(()=> {
            return from(firebase.auth().currentUser.getIdToken());
        })
        ,mergeMap((token: string)=>{
          this.router.navigate(['/']);
            return [
                {
                    type : AuthActions.SIGNIN
                },
                {
                    type:AuthActions.SET_TOKEN,
                    payload: token
                }
        ];

      }));

    constructor(private router : Router,private actions$: Actions){

    }
}
