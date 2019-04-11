import { Ingredient } from "../models/ingredient";
import { Receipe } from "../models/receipe";
import 'rxjs/Rx'

export class ReceipesService {
  private receipes: Receipe[] = [];

  addReceipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[]) {
    this.receipes.push(new Receipe(title, description, difficulty, ingredients));
    console.log(this.receipes);
  }

  getReceipes() {
    return this.receipes.slice();
  }

  updateReceipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[]) {
    this.receipes[index] = new Receipe(title, description, difficulty, ingredients);
  }

  removeReceipe(index: number) {
    this.receipes.splice(index, 1);
  }

  resetReceipe(rec: Receipe[]){
    this.receipes = rec
  }
}
