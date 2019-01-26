import { Recipe } from '../recipe.model';
import {Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes:State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
      //   new Recipe('Carbonara',
      //   'Italian style carbonara',
      //   'https://hips.hearstapps.com/del.h-cdn.co/assets/17/03/2560x1706/gallery-1484784941-white-cheddar-carbonaral1.jpg',
      //   [new Ingredient('Pasta',1),
      //    new Ingredient('All purpose Cream',1),
      //    new Ingredient('Ham',1),
      //  ]),
      //   new Recipe('Spaghetti',
      //   'sun-dried tomato spaghetti',
      //   'https://img.taste.com.au/0B8MgqfZ/w643-h428-cfill-q90/taste/2016/11/spaghetti-with-sun-dried-tomato-sauce-53677-1.jpeg',
      //   [new Ingredient('Pasta',1),
      //   new Ingredient('Sun-dried tomato',1),
      //   new Ingredient('ground pork',1)
      // ]),
      //   new Recipe('Lasagna',
      //   'Classic lasagna recipe with ground beef, onion, Mozzarella, Ricotta',
      //   'https://www.simplyrecipes.com/wp-content/uploads/2004/12/lasagna-horiz-b-2000.jpg',
      //   [new Ingredient('1/2 lb dry lasagna noodles ',9),
      //   new Ingredient('15 ounces Ricotta cheese',1),
      //   new Ingredient('1/2 lb (24 ounces) Mozzarella cheese, grated or sliced',1),
      //   new Ingredient('1/4 lb (4 ounces) freshly grated Parmesan cheese',1),
      //   new Ingredient('Olive oil',1),
      //   new Ingredient('1 pound lean ground beef (chuck)',1),
      // ])
    ]
};

export function recipeReducer(state = initialState, action:RecipeActions.RecipeActions){
    switch(action.type){
        case (RecipeActions.SET_RECIPES) :
            return {
                    ...state,
                    recipes:[...action.payload]
            };
        case (RecipeActions.ADD_RECIPE) :
            return {
                    ...state,
                    recipes:[...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index]= updatedRecipe;
            return {
                    ...state,
                    recipes:recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload,1);
            return {
                    ...state,
                    recipes:oldRecipes
            };
        default:
            return state;
    }

}
