import { Recipe } from '../recipe.model';

export class RecipeService {
   private recipes: Recipe[] = [
        new Recipe('Carbonara','Italian style carbonara','https://hips.hearstapps.com/del.h-cdn.co/assets/17/03/2560x1706/gallery-1484784941-white-cheddar-carbonaral1.jpg'),
        new Recipe('Spaghetti','sun-dried tomato spaghetti','https://img.taste.com.au/0B8MgqfZ/w643-h428-cfill-q90/taste/2016/11/spaghetti-with-sun-dried-tomato-sauce-53677-1.jpeg')
      ];

    getRecipes() {
        return this.recipes.slice();
    }     

}