import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shared/shoppingList.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/shared/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipeModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
            AppComponent,
            HeaderComponent,

  ],
  imports: [
            BrowserModule,
            HttpModule,
            RecipeModule,
            ShoppingListModule,
            AuthModule,
            AppRoutingModule,
            SharedModule
  ],
  providers: [ShoppingListService,
              RecipeService,
              DataStorageService,
              AuthService,
              AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
