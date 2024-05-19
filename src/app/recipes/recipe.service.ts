import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  //no need for dummy recipes as we are fetching it from firebase
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Custard',
  //     'A milky custard with a lot of fruits',
  //     'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     [
  //       { name: 'Strawberry', amount: 3 },
  //       { name: 'Milk Packet', amount: 1 },
  //       { name: 'Oats packet', amount: 2 },
  //     ]
  //   ),
  //   new Recipe(
  //     'Pancake',
  //     'A multi stroy pancake',
  //     'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     [
  //       { name: 'Dough', amount: 4 },
  //       { name: 'Butter', amount: 1 },
  //       { name: 'Honey Pouch', amount: 2 },
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
  ) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingL(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
