import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as RecipeActions from '../store/recipe.actions';
import {Recipe} from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {

@Effect()
recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES))
    .switchMap((action: RecipeActions.FetchRecipes)=>{
        return this.httpClient.get<Recipe[]>(`https://recipe-book-7037c.firebaseio.com/recipes.json`,
        {
            observe:'body',
            responseType:'json',
        })                  
    })
    .map(
        (recipes)=> {
         for(let recipe of recipes)
         {
             if(!recipe['ingredients']){
                 recipe['ingredients']=[];
             }
         }
         return {
             type : RecipeActions.SET_RECIPES,
             payload: recipes
         }
        }
    );
constructor(private actions$: Actions,
            private httpClient:HttpClient) {}
}