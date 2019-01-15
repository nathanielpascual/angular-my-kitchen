import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService} from './shared/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState : Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService : ShoppingListService,
              private store: Store<{shoppingList : {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
      this.shoppingListState = this.store.select('shoppingList');
  }
  
  onEditItem(index : number) {
    this.shoppingListService.startEditing.next(index);
  }

  


}
