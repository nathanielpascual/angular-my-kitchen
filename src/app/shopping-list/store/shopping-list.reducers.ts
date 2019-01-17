import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
    shoppingList : State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientsIndex: number;
}

const initialState:State = {
    ingredients : [
        new Ingredient ('Apples',5),
        new Ingredient ('Tomatoes',10)
    ],
    editedIngredient : null,
    editedIngredientsIndex:-1
}
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions ) {
 switch(action.type) {
    case  ShoppingListActions.ADD_INGREDIENT: 
        return  {... state,
            ingredients: [...state.ingredients, action.payload]
        };
    case  ShoppingListActions.ADD_INGREDIENTS: 
        return  {... state,
            ingredients: [...state.ingredients, ...action.payload]
        };
    case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.editedIngredientsIndex];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload.ingredient
        };
        const ingredients = [...state.ingredients];
        ingredients[state.editedIngredientsIndex] = updatedIngredient;
        return {
          ...state,
          ingredients: ingredients,
          editedIngredient : null,
          editedIngredientsIndex:-1
        };
    case ShoppingListActions.DELETE_INGREDIENT:
        const oldIngredients = [...state.ingredients];
        oldIngredients.splice(state.editedIngredientsIndex,1);
        return {
               ...state,
               ingredients:oldIngredients,
               editedIngredient : null,
               editedIngredientsIndex:-1
               
        };
    case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]};
        return { 
            ...state,
            editedIngredient:editedIngredient,
            editedIngredientsIndex: action.payload
        };
    case ShoppingListActions.STOP_EDIT:
        
        return { 
            ...state,
            editedIngredient : null,
            editedIngredientsIndex:-1
        };
    default:
        return state;
 }
}