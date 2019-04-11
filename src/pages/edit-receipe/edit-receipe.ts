import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ReceipesService } from '../../services/receipes.service';
import { Receipe } from '../../models/receipe';

@Component({
  selector: 'page-edit-receipe',
  templateUrl: 'edit-receipe.html',
})

export class EditReceipePage implements OnInit{

  mode = 'New'
  selectOptions=["Easy", "Medium", "Hard"]
  receipeForm : FormGroup
  receipe: Receipe
  index: number

  constructor(private navParams: NavParams,
    private actSheetCtrl: ActionSheetController,
    private alrtCtrl: AlertController,
    private toastCtrl: ToastController,
    private receipesService: ReceipesService,
    private navCtrl: NavController) {}

  ngOnInit(){
    this.mode = this.navParams.get('mode')
    if(this.mode == 'Edit'){
      this.receipe = this.navParams.get('receipe')
      this.index = this.navParams.get('index')
    }
    this.initializeForm()
  }

  private initializeForm(){
    let title = null
    let description = null
    let difficulty = 'Medium'
    let ingredients = []
    
    if(this.mode == 'Edit'){
      console.log('Edit receipe')
      console.log(this.receipe)
      title = this.receipe.title
      description = this.receipe.description
      difficulty = this.receipe.difficulty
      //Since form cannot take array inputs(here ingredients is an array) we need to initialise formcontrol
      for(let ing of this.receipe.ingredients){
        ingredients.push(new FormControl(ing.name, Validators.required))
      }
    }

    this.receipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }

  onSubmit(){
    let value = this.receipeForm.value
    let ingredients = []
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name=>{
        return {name: name, quantity: 1}
      })
    }

    if(this.mode == 'Edit'){
      this.receipesService.updateReceipe(this.index, value.title, value.description, value.difficulty, ingredients)
    }
    else{
      this.receipesService.addReceipe(value.title, value.description, value.difficulty, ingredients)
    }
    this.receipeForm.reset()
    console.log(this.receipesService.getReceipes())
    this.navCtrl.popToRoot()
  }

  onManageIngredients(){
    const actionSheet = this.actSheetCtrl.create({
      title: 'What you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: ()=>{
            this.createNewIngredientALert().present()
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: ()=>{
            const fArray: FormArray = <FormArray> this.receipeForm.get('ingredients')
            const len = fArray.length
            if(len>0){
              for(let i = len-1; i >= 0; i--){
                fArray.removeAt(i)
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients deleted',
                duration: 1000,
                position: 'top'
              })
              toast.present()
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present() 
  }

  private createNewIngredientALert(){
    return this.alrtCtrl.create({
      title: 'Add Ingredient',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              //error in a toast
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 1000,
                position: 'top'
              })
              toast.present()
              return
            }
            (<FormArray>this.receipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required)) //Since TS doesn't know this is a form array we need to explicitly cast it.
            const toast = this.toastCtrl.create({
              message: 'Ingredient added successfully',
              duration: 1000,
              position: 'bottom'
            })
            toast.present()
          }
        }
      ]
    })
  }
}
