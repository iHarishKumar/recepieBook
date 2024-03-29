import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alrtCtrl: AlertController){}

  onSignup(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: "Signing you up..."
    })
    loading.present()
    this.authService.signup(form.value.email, form.value.password)
        .then(
          data => {
            loading.dismiss()
          })
        .catch(error => {
          loading.dismiss()
          const alrt = this.alrtCtrl.create({
            title: "Signup Failed!",
            message: error.message,
            buttons: ['OK']
          })
          alrt.present()
        })
  }
}
