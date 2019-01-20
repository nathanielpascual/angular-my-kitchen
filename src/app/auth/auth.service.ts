import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import  { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthAction from './store/auth.action';

@Injectable()
export class AuthService {
token: string;

constructor(private router : Router, private store: Store<fromApp.AppState>){

}
    signupUser(email:string, password:string){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response)=> {
                    user => {
                        this.store.dispatch(new AuthAction.Signup());

                        this.router.navigate(['/signin']);
                        firebase.auth().currentUser.getIdToken()
                            .then((token: string)=>{
                                this.store.dispatch(new AuthAction.SetToken(token));
                            })
                    }
                })
                .catch((error)=> console.log(error));
    }

    
    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email,password)
                .then((response)=>{
                    this.store.dispatch(new AuthAction.Signin());
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                            .then((token: string)=>{
                                this.store.dispatch(new AuthAction.SetToken(token));
                            })
                })
                .catch((error)=> console.log(error));
    }
    signOut() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthAction.Logout());
        this.router.navigate(['/signin']);
    }

}