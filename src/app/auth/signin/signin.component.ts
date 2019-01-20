import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm){
    const email = form.value.userSignIn.email;
    const password = form.value.userSignIn.password;
    this.store.dispatch(new AuthActions.Trysignin({username : email, password:password}));

  }
}
