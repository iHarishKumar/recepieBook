import { Ingredient } from "../models/ingredient";
import { Receipe } from "../models/receipe";
import { HttpClient } from "@angular/common/http";
import { ReceipeRestfulService } from "./restful/receipes.restful";

export class ReceipesService {
  private receipes = [];
  private restfulService: ReceipeRestfulService = null;
  
  setHttpClient(http: HttpClient){
    this.restfulService = new ReceipeRestfulService(http)
  }

  addReceipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[]) {
    
    this.restfulService.addReceipe(title, description, difficulty, ingredients)
        .then((data) => {
          this.receipes = <Receipe[]> data
          console.log('added receipe')
          console.log(this.receipes)
          console.log(data)

        })
    
    //this.receipes.push(new Receipe(title, description, difficulty, ingredients));
    console.log(this.receipes);
  }

  getReceipes() {

    this.restfulService.getReceipes()
                      .then(data =>
                        {
                          console.log('---------')
                          console.log(data)
                          this.receipes = <Receipe[]>data
                        })

    console.log('nwengfonwheofwe----------')
    console.log(this.receipes)
    this.receipes.forEach( ele => {
      if(typeof(ele.ingredients) == 'string')
      ele.ingredients = JSON.parse(ele.ingredients.replace(/\'/g, '\"'))
    })

    console.log('Got data--')
    console.log(this.receipes)

    return this.receipes
  }

  updateReceipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[]) {
                
    this.restfulService.updateReceipe(title, description, difficulty, ingredients)
                .then((data) => {
                  let value = <Receipe[]> data
                  console.log('Receipe updated--')
                  console.log(value)
                })
    //this.receipes[index] = new Receipe(title, description, difficulty, ingredients);
  }

  removeReceipe(index: number, title: string) {
    this.restfulService.removeReceipe(title)
        .then((data) => {
          let val = data
          console.log('Receipe deleted')
        })
    //this.receipes.splice(index, 1);
  }
}
