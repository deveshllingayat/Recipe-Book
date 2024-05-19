import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[] = [];
  private addIngredientSub:Subscription;
  constructor(private shoppingListService:ShoppingListService){}
  ngOnInit(): void {
     this.ingredients =  this.shoppingListService.getIngredients();
     this.addIngredientSub = this.shoppingListService.addIngredientChanged.subscribe((ingredients:Ingredient[])=>{this.ingredients=ingredients});
     
  }
  ngOnDestroy(){
    this.addIngredientSub.unsubscribe();
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
  
}
