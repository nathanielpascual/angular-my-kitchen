import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

import { AuthsRoutingModule } from './auth-routing.module';

@NgModule({
    declarations : [
        SignupComponent,
        SigninComponent
    ],
    imports : [
        CommonModule,
        FormsModule,
        RouterModule,
        AuthsRoutingModule
    ]
})
export class AuthModule{
    
}