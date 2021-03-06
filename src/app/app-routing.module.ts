import { NgModule } from '@angular/core';
import { Routes,RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path : '', component: HomeComponent},
    { path: 'recipes',loadChildren:'./recipes/recipes.module#RecipeModule',canActivate:[AuthGuard]},
    //{ path : 'shopping-list',component:ShoppingListComponent,canLoad:[AuthGuard],canActivate:[AuthGuard]}
    { path : 'shopping-list',component:ShoppingListComponent,canActivate:[AuthGuard]}
];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}