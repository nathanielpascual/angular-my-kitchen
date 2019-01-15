import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';


export class RecipeService {
   recipeChanged = new Subject;
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
      ]),
        new Recipe('Lasagna',
        'Classic lasagna recipe with ground beef, onion, Mozzarella, Ricotta',
        'https://www.simplyrecipes.com/wp-content/uploads/2004/12/lasagna-horiz-b-2000.jpg',
        [new Ingredient('1/2 lb dry lasagna noodles ',9),
        new Ingredient('15 ounces Ricotta cheese',1),
        new Ingredient('1/2 lb (24 ounces) Mozzarella cheese, grated or sliced',1),
        new Ingredient('1/4 lb (4 ounces) freshly grated Parmesan cheese',1),
        new Ingredient('Olive oil',1),
        new Ingredient('1 pound lean ground beef (chuck)',1),
      ])
      
      ];

    constructor(){}
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }     
    
    getRecipe(id: number) {
       return this.recipes[id];
    }

    addRecipe(recipe: Recipe)
    {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice()) ;
    }

    updateRecipe(index: number, recipe: Recipe)
    {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number)
    {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}