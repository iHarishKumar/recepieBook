import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { EditReceipePage } from '../pages/edit-receipe/edit-receipe';
import { ReceipePage } from '../pages/receipe/receipe';
import { ReceipesPage } from '../pages/receipes/receipes';
import { TabsPage } from '../pages/tabs/tabs';
import { ReceipesService } from '../services/receipes.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { RestfulService } from '../services/restful.service';
import { HttpClientModule } from '@angular/common/http';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';
import { HttpModule } from '@angular/http';
import { DatabaseOptionsPage } from '../pages/database-option/database-options';
import { ConnectionService } from '../services/connection.service';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    EditReceipePage,
    ReceipePage,
    ReceipesPage,
    TabsPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    EditReceipePage,
    ReceipePage,
    ReceipesPage,
    TabsPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    ReceipesService,
    RestfulService,
    AuthService,
    ConnectionService
  ]
})
export class AppModule {}
