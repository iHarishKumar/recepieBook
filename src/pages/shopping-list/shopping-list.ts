import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RestfulService } from '../../services/restful.service';
import { PopoverController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-option/database-options';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[] = []

  constructor(private slService: ShoppingListService,
              private restfulService: RestfulService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private connService: ConnectionService){}

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

  //Here it is mouse/just click event.
  //This will let the app know where to render the popover i.e. binding the popover to the event triggered.
  onShowOptions(event: MouseEvent){
    const popover = this.popoverCtrl.create(DatabaseOptionsPage)
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    popover.present({ev: event})
    popover.onDidDismiss( 
      (data)=>{
        if(!data){
          return
        }
        if(data.action == 'Load'){
          loading.present()
          this.authService.getActiveUser().getIdToken()
              .then((token: string) => {
                this.connService.fetchList(token, 'shopping').subscribe(
                  (list: Ingredient[]) => {
                    if(list){
                      this.slService.resetItems(list)
                      this.listItems = list
                    } else {
                      this.slService.resetItems([])
                      this.listItems = []
                    }
                    loading.dismiss()
                  },
                  (error) => {
                    loading.dismiss()
                    this.connService.handleError(error.json().error)
                  }
                )
              })
          this.listItems = this.slService.getItems()
        }
        else if(data.action == 'Store'){
          loading.present()
          this.authService.getActiveUser().getIdToken()
              .then( (token: string) => {
                this.connService.storeList(token, 'shopping', this.listItems).subscribe(
                  ()=>{
                    loading.dismiss()
                  },
                  (error) =>{
                    loading.dismiss()
                    console.log( 'error')
                    this.connService.handleError(error.json().error)
                  }
                )
              })
              .catch((error) =>{
              })
        }
      })
  }
}
