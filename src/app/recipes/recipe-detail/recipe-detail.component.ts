import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  // @Input() recipe:Recipe;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router:Router,
    private dataStorageService:DataStorageService
  ) {}
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingL(this.recipe.ingredients);
    this.router.navigate(['/shopping-list'])
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    //both works same
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.dataStorageService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
