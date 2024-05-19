import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}
  recipes: Recipe[] = this.recipesService.getRecipes();
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    if (this.recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }else{
        return this.recipes;
    }
  }
}
export const RecipeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(RecipesResolverService).resolve;
};
