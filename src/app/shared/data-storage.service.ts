import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/shared/recipe.service';
import { Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor (private http: Http,
                 private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://recipe-book-7037c.firebaseio.com/recipes.json',this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get('https://recipe-book-7037c.firebaseio.com/recipes.json')
                   .map(
                       (response : Response)=> {
                        const recipes = response.json();
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