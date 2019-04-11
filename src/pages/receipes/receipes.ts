import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController } from 'ionic-angular';
import { EditReceipePage } from '../edit-receipe/edit-receipe';
import { ReceipesService } from '../../services/receipes.service';
import { Receipe } from '../../models/receipe';
import { ReceipePage } from '../receipe/receipe';
import { DatabaseOptionsPage } from '../database-option/database-options';
import { AuthService } from '../../services/auth';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'page-receipes',
  templateUrl: 'receipes.html',
})
export class ReceipesPage {

  receipes : Receipe[] = []

  constructor(private navCtrl: NavController, 
    private receipesService: ReceipesService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private connService: ConnectionService) {}

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
                this.connService.fetchList(token, 'receipe').subscribe(
                  (list: Receipe[]) => {
                    if(list){
                      this.receipesService.resetReceipe(list)
                      this.receipes = list 
                    } else {
                      this.receipesService.resetReceipe([])
                      this.receipes = []
                    }
                    loading.dismiss()
                  },
                  (error) => {
                    loading.dismiss()
                    console.log(error)
                    this.connService.handleError(error.json().error)
                  }
                )
              })
        }
        else if(data.action == 'Store'){
          loading.present()
          this.authService.getActiveUser().getIdToken()
              .then( (token: string) => {
                this.connService.storeList(token, 'receipe', this.receipes).subscribe(
                  ()=>{
                    loading.dismiss()
                  },
                  (error) =>{
                    loading.dismiss()
                    console.log('error')
                    this.connService.handleError(error)
                  }
                )
              })
              .catch((error) =>{
              })
        }
      })
  }
}
