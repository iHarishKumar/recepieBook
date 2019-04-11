import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
              private loadCtrl: LoadingController,
              private alrtCtrl: AlertController){}

  onSignin(form: NgForm){
    const loading = this.loadCtrl.create({
      content: "Signing you in..."
    })
    loading.present()
    this.authService.signin(form.value.email, form.value.password)
        .then( (data) => {
          loading.dismiss()
        })
        .catch( (error) => {
          loading.dismiss()
          const alrt = this.alrtCtrl.create({
            title: "Problem signing in!",
            message: error.message,
            buttons: ['OK']
          })
          alrt.present()
        })
  }
}
