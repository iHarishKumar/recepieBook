import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceipePage } from './receipe';

@NgModule({
  declarations: [
    ReceipePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceipePage),
  ],
})
export class ReceipePageModule {}
