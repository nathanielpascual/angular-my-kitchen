import { Recipe } from '../recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shared/shoppingList.service';

@Injectable()
export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>();
   
   private recipes: Recipe[] = [
        new Recipe('Carbonara',
        'Italian style carbonara',
        'https://hips.hearstapps.com/del.h-cdn.co/assets/17/03/2560x1706/gallery-1484784941-white-cheddar-carbonaral1.jpg',
        [new Ingredient('Pasta',1),
         new Ingredient('All purpose Cream',1),
         new Ingredient('Ham',1),
       ]),
        new Recipe('Spaghetti',
        'sun-dried tomato spaghetti',
        'https://img.taste.com.au/0B8MgqfZ/w643-h428-cfill-q90/taste/2016/11/spaghetti-with-sun-dried-tomato-sauce-53677-1.jpeg',
        [new Ingredient('Pasta',1),
        new Ingredient('Sun-dried tomato',1),
        new Ingredient('ground pork',1)
      ])
      ];

    constructor(private shoppingListService : ShoppingListService){

    }

    getRecipes() {
        return this.recipes.slice();
    }     

    addIngredientsToList(ingredients : Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

}