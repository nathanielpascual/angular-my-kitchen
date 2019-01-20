import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  email ='';
  password = '';

  constructor(private store : Store<fromApp.AppState>) {

   }

  ngOnInit() {
     this.registerForm.reset();
  }

  onSignUp(form: NgForm){
    this.email = form.value.userSignUp.email;
    this.password = form.value.userSignUp.password;
    this.store.dispatch(new AuthActions.Trysignup({username : this.email, password:this.password}));
    
  }
}
