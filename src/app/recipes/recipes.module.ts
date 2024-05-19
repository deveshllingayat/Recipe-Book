import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
   //These module provides directives such as ngIf,ngFor & routerLink,formGroup etc so we need to import it here 
   //because even if if imported it in app.module it is not available to the components declared in other modules as recipes.module in this case
   //only services delcared in app.module such as HttpClientModule are accessible to all components 
  imports: [RouterModule, ReactiveFormsModule,RecipesRoutingModule,SharedModule],
  //no need to export as we already have recipes-routing.module for this components 
//   exports: [
//     RecipesComponent,
//     RecipeListComponent,
//     RecipeDetailComponent,
//     RecipeItemComponent,
//     RecipeStartComponent,
//     RecipeEditComponent,
//   ],
})
export class RecipesModule {}
