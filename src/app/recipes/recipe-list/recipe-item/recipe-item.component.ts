import { Component, OnInit,Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;
  @Input() index:number;
  
  ngOnInit() {
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
