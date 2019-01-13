import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/shared/recipe.service';
import { Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
    constructor (private httpClient: HttpClient,
                 private recipeService: RecipeService,
                 private authService : AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.httpClient.put(`https://recipe-book-7037c.firebaseio.com/recipes.json?auth=${token}`,this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        //return this.httpClient.get<Recipe[]>(`https://recipe-book-7037c.firebaseio.com/recipes.json?auth=${token}`)
        return this.httpClient.get<Recipe[]>(`https://recipe-book-7037c.firebaseio.com/recipes.json?auth=${token}`,
        {
            observe:'body',
            responseType:'json'
        })
                   .map(
                       (recipes)=> {
                        //const recipes = response.json();
                        for(let recipe of recipes)
                        {
                            if(!recipe['ingredients']){
                                recipe['ingredients']=[];
                            }
                        }
                        return recipes;
                       }
                   )
                   .subscribe(
                       (recipes: Recipe[]) => {
                           this.recipeService.setRecipes(recipes);
                       }
                  );
    }
}