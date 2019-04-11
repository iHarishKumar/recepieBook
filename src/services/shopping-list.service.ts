import { Ingredient } from "../models/ingredient";
import 'rxjs/Rx';
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingListService{
    private ingredients : Ingredient[] = []

    addItem(name : string, quantity: number){
        this.ingredients.push(new Ingredient(name, quantity))
    }

    addItems(items: Ingredient[]){
        this.ingredients.push(...items)
    }

    getItems(){
        return this.ingredients.slice()
    }

    removeItem(index: number){
        this.ingredients.splice(index, 1)
    }

    resetItems(items: Ingredient[]){
        this.ingredients = items
    }
}