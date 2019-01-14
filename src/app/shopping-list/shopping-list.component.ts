import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService} from './shared/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  //ingredients: Ingredient[];
  shoppingListState : Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;
  constructor(private shoppingListService : ShoppingListService,
              private store: Store<{shoppingList : {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
     // this.ingredients= this.shoppingListService.getIngredients();
      this.shoppingListState = this.store.select('shoppingList');
      // this.subscription = this.shoppingListService.ingredientChanged
      //     .subscribe(
      //       (ingredients : Ingredient[])=> {
      //         this.ingredients = ingredients;
      //       }
      //     );
  }

  onEditItem(index : number) {
    this.shoppingListService.startEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  


}
