import { Component, OnInit } from '@angular/core';
import { Receipe } from '../../models/receipe';
import { NavParams, NavController } from 'ionic-angular';
import { EditReceipePage } from '../edit-receipe/edit-receipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ReceipesService } from '../../services/receipes.service';

@Component({
  selector: 'page-receipe',
  templateUrl: 'receipe.html',
})
export class ReceipePage implements OnInit{

  receipe : Receipe;
  index: number;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private slService: ShoppingListService,
              private receipeService: ReceipesService){}

  ngOnInit(){
    this.receipe = this.navParams.get('receipe');
    this.index = this.navParams.get('index');
    console.log(this.receipe)
  }

  onEditReceipe(){
    this.navCtrl.push(EditReceipePage, {mode: 'Edit', receipe: this.receipe, index: this.index})
  }

  onDeleteReceipe(){
    //this.receipeService.removeReceipe(this.index ,this.receipe.title)
    this.receipeService.removeReceipe(this.index)
    this.navCtrl.popToRoot()
  }

  onAddIngredients(){
    this.slService.addItems(this.receipe.ingredients); 
  }
}