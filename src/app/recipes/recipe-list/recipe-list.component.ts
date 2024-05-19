import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // before using services
  //   recipes: Recipe[] = [
  //     new Recipe(
  //       'A test recipe',
  //       'test desc',
  //       'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600'
  //     ),
  //     new Recipe('test 2','test2 desc','https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600')
  //   ];
  recipes: Recipe[] = [];
  recipeChangedSubs: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    // private dataStorageService:DataStorageService
  ) {}

  ngOnInit(): void {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangedSubs = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  ngOnDestroy(): void {
    this.recipeChangedSubs.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
