import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService} from '../shared/shoppingList.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient;
  constructor(private shoppingListService : ShoppingListService,
              private store: Store<{shoppingList : {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
   this.subscription= this.shoppingListService.startEditing
        .subscribe((index : number)=>{
            this.editedItemIndex=index;
            this.editMode=true;
            this.editedItem = this.shoppingListService.getIndredient(index);
            this.shoppingListForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
        })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);

    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else {
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear()
  {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
  }
}
