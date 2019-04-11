import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import { AlertController } from "ionic-angular";
import { Ingredient } from "../models/ingredient";

@Injectable()
export class ConnectionService{

    constructor(private http: Http, private authService: AuthService, private alertCtrl: AlertController){}
    storeList(token: string, type: string, value: any){
        const userId = this.authService.getActiveUser().uid
        return this.http
                .put('https://ionic2-receipebook-3803f.firebaseio.com/user/' + userId + '/'+ type+'-list.json?auth=' + token, value)
                .map((response : Response) => {
                    return response.json()
                })
    }

    fetchList(token: string, type: string){
        const userId = this.authService.getActiveUser().uid
        return this.http.get('https://ionic2-receipebook-3803f.firebaseio.com/user/' + userId + '/' + type +'-list.json?auth=' + token)
                        .map((response:Response) => {
                            if(type == 'receipe'){
                                const rece = response.json() ? response.json() : []
                                for(let item of rece){
                                    if(!item.hasOwnProperty('ingredients')){
                                      item.ingredients = []
                                    }
                                  }
                                  return rece

                            } else {
                                return response.json()
                            }
                        })
                        //This is executed just before the subscribe is executed.
                        .do((ingredient : Ingredient[]) => {
                            // if(this.ingredients){
                            //     this.ingredients = ingredient
                            // }
                            // else{
                            //     this.ingredients = []
                            // }
                        })
    }

    handleError(errorMessage: string){
        const alert = this.alertCtrl.create({
          title: 'Something went wrong!',
          message: errorMessage,
          buttons: ['OK']
        })
        alert.present()
    }
}