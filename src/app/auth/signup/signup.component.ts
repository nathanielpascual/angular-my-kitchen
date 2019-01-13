import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  email ='';
  password = '';

  constructor(private authService: AuthService) {

   }

  ngOnInit() {
     this.registerForm.reset();
  }

  onSignUp(form: NgForm){
    this.email = form.value.userSignUp.email;
    this.password = form.value.userSignUp.password;
    this.authService.signupUser(this.email,this.password);
  }
}
