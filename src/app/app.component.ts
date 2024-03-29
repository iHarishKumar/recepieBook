import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { AuthService } from '../services/auth';
import { ShoppingListService } from '../services/shopping-list.service';
import { ReceipesService } from '../services/receipes.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage
  signinPage = SigninPage
  signupPage = SignupPage
  isAuthenticated = false

  @ViewChild('nav') nav: NavController

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuCtrl: MenuController, 
    private authSerive: AuthService,
    private slService: ShoppingListService,
    private recepieService: ReceipesService) {

      firebase.initializeApp({
        apiKey: "<YOUR_API_KEY>",
        authDomain: "<YOUR_AUTH_DOMAIN>",
      })
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          this.isAuthenticated = true
          this.rootPage = TabsPage
        }
        else{
          this.isAuthenticated = false
          this.rootPage = SigninPage
        }
      })
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
  }

  onLoad(page: any){
    this.nav.setRoot(page)
    this.menuCtrl.close()
  }

  onLogout(){
    this.authSerive.logout()
    this.menuCtrl.close()
    console.log(this.slService.getItems())
    this.slService.resetItems([])
    this.recepieService.resetReceipe([])
    this.nav.setRoot(SigninPage)
  }
}

