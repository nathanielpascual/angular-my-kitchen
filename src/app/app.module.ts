import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { StoreRouterConnectingModule} from '@ngrx/router-store';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {reducers} from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
            AppComponent
  ],
  imports: [
            BrowserModule.withServerTransition({appId:"my-kitchen"}),
            ///HttpModule,
            HttpClientModule,
            AuthModule,
            ShoppingListModule,
            AppRoutingModule,
            SharedModule,
            CoreModule,
            StoreModule.forRoot(reducers),
            EffectsModule.forRoot([AuthEffects]),
            StoreRouterConnectingModule,
            !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
