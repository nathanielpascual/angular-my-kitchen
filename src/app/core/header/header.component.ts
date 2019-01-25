import {Component, OnInit} from '@angular/core';

import { Store} from '@ngrx/store';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthAction from '../../auth/store/auth.action';
import * as RecipeAction from '../../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl : './header.component.html'
})

export class HeaderComponent implements OnInit{
    authState: Observable<fromAuth.State>;
    constructor(private dataStorageService : DataStorageService,
               private router: Router,
               private store: Store<fromApp.AppState>) {

    }
    ngOnInit() {
        this.authState = this.store.select('auth');
    }
    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response : HttpEvent<Object>) => {
                    console.log(response);
                }
            );
    }

    onFetchData() {
        this.store.dispatch(new RecipeAction.FetchRecipes());
    }

    onLogout(){
        this.router.navigate(['/signin']);
        this.store.dispatch(new AuthAction.Logout());
    }
}
