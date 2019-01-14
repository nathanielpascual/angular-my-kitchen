import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
///import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';


@NgModule({
  declarations: [
            AppComponent
  ],
  imports: [
            BrowserModule,
            ///HttpModule,
            HttpClientModule,
            AuthModule,
            ShoppingListModule,
            AppRoutingModule,
            SharedModule,
            CoreModule,
            StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
