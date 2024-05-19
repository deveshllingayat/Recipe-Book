import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //only redirect if full path is ''
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => {
        return m.RecipesModule;
      }),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then((m) => {
        return m.ShoppingListModule;
      }),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => {
        return m.AuthModule;
      }),
  },
];
@NgModule({
  //preloadingStrategy will load all modules in mean time whenever user browses
  //the main bundle will be smaller only but as we are implementing lazy loading it may cause a tiny delay while downloading modules on user action
  //so we implement preloadingstrategy to load all modules after loading main module which makes performance faster
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
