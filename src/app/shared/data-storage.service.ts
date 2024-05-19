import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Observable, exhaustMap, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    //.put() will overwrite all existing data
    this.http
      .put(
        'https://my-shop-d324f-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes(): Observable<Recipe[]> {
    //take() operator will automatically unsubscribe after 1 value is received
    //the exhaustMap() operater will execute after first observable is completed and then it will switch the observable chain to return a new observable i.e returned from get request
    //map() and tap() are then executed subsequently

    //in other api we add token in headers while in firebase api we add it in queryparameter
    return this.http
      .get<Recipe[]>(
        'https://my-shop-d324f-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          if (recipes) {
            return recipes.map((recipe) => {
              //   console.log(recipe);
              const ingredients = recipe.ingredients ? recipe.ingredients : [];
              return {
                ...recipe,
                ingredients: ingredients,
              };
            });
          } else {
            alert('No Recipes Found!');
          }
        }),
        tap((recipes) => {
          if (recipes) this.recipeService.setRecipes(recipes);
        })
      );
  }

  deleteRecipe(id: number) {
    this.http
      .delete(
        `https://my-shop-d324f-default-rtdb.firebaseio.com/recipes/${id}.json`
      )
      .subscribe();
  }
}
