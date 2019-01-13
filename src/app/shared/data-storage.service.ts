import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
        //const token = this.authService.getToken();
        //const headers = new HttpHeaders().set('Authorization','Bearer asdfghwert');
        // return this.httpClient.put(`https://recipe-book-7037c.firebaseio.com/recipes.json`,
        // this.recipeService.getRecipes(),{
        //     observe: 'body',
        //     params: new HttpParams().set('auth',token)
        //    //headers: headers
        // });
        const req = new HttpRequest('PUT',`https://recipe-book-7037c.firebaseio.com/recipes.json`,
        //this.recipeService.getRecipes(),{reportProgress:true, params: new HttpParams().set('auth',token)});
        this.recipeService.getRecipes(),{reportProgress:true});

        return this.httpClient.request(req);
    }

    getRecipes() {
        //const token = this.authService.getToken();
        //return this.httpClient.get<Recipe[]>(`https://recipe-book-7037c.firebaseio.com/recipes.json?auth=${token}`)
        return this.httpClient.get<Recipe[]>(`https://recipe-book-7037c.firebaseio.com/recipes.json`,
        {
            observe:'body',
            responseType:'json'//,
           // params: new HttpParams().set('auth',token)
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