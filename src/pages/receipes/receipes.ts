import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditReceipePage } from '../edit-receipe/edit-receipe';
import { ReceipesService } from '../../services/receipes.service';
import { Receipe } from '../../models/receipe';
import { ReceipePage } from '../receipe/receipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-receipes',
  templateUrl: 'receipes.html',
})
export class ReceipesPage {

  receipes : Receipe[] = []

  constructor(private navCtrl: NavController, 
    private receipesService: ReceipesService,
    private httpService: HttpClient){
      this.receipesService.setHttpClient(httpService)
    }

  onNewReceipe(){
    this.navCtrl.push(EditReceipePage, {mode: 'New'})
  }

  ionViewWillEnter(){
    console.log('ionview')
    this.receipes = this.receipesService.getReceipes()
  }

  onLoadReceipe(index : number){
    this.navCtrl.push(ReceipePage, { receipe: this.receipes[index], index: index})
  }
}
