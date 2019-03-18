import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RestfulService } from '../../services/restful.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[] = []

  constructor(private slService: ShoppingListService,
              private restfulService: RestfulService,
              private httpService: HttpClient){
                this.restfulService.setHttpClient(httpService)
              }

  onAddItem(form: NgForm){
    console.log(form)

    this.slService.addItem(form.value.ingredientName, form.value.quantity)

    console.log(this.slService.getItems())

    form.reset()

    this.loadItems()
  }

  ionViewWillEnter(){
   this.listItems = this.slService.getItems() 
  }

  private loadItems(){
    this.listItems = this.slService.getItems()
  }

  onCheckItem(index: number){
    this.slService.removeItem(index)
    this.loadItems()
  }

  getRequest(){
    this.restfulService.addEmployeeGet('dummyget', 22, 'Male').then(
      (data) => {
        console.log("Get Request--------")
        console.log(typeof(data))
        console.log(data)
      }
    )
  }
  postRequest(){
    this.restfulService.addEmployeePost('dummyposydcudtt', 32, 'Female').then(
      (data) =>{
        console.log("Post Request-------")
        console.log(typeof(data))
        console.log(data)
      }
    )
  }
}
