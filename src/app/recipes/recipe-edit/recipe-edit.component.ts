import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Store} from '@ngrx/store';
import { RecipeService } from '../shared/recipe.service';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeAction from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id: number;
 editMode =false;
 recipeForm: FormGroup;

 constructor(private route:ActivatedRoute,
             private recipeService: RecipeService,
             private router: Router,
             private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
        .subscribe(
          (params : Params) => {
              this.id = +params['id'];
              this.editMode = params['id']!= null;
          }
        );
    this.initForm();
  }

  private initForm() {
     let recipeName = '';
     let recipeImagePath = '';
     let recipeDescription = '';
     let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      //const recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes')
          .take(1)
          .subscribe((recipeState: fromRecipe.State)=>{
            const recipe = recipeState.recipes[this.id];

            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if(recipe['ingredients']) {
              for(let ingredient of recipe.ingredients)
              {
                recipeIngredients.push(new FormGroup({
                  'name' : new FormControl(ingredient.name,Validators.required),
                  'amount' : new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                }))
              }
            }
          });
      
    }

    this.recipeForm =  new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngredients
    });

     
  }
  
  onSubmit(){
    if(this.editMode){
      this.store.dispatch(new RecipeAction.UpdateRecipe({
        index: this.id, 
        updatedRecipe: this.recipeForm.value
      }));
    }
    else{
      this.store.dispatch(new RecipeAction.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
