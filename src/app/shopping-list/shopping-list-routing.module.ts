import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
//import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const shoppinglistRoutes = [
    { path: 'shopping-list', component: ShoppingListComponent}
]
@NgModule({
    imports: [
        RouterModule.forChild(shoppinglistRoutes)
    ],
    exports : [RouterModule]
})
export class ShoppingListsRoutingModule{

}