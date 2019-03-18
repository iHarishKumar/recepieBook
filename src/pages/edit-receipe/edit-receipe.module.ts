import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditReceipePage } from './edit-receipe';

@NgModule({
  declarations: [
    EditReceipePage,
  ],
  imports: [
    IonicPageModule.forChild(EditReceipePage),
  ],
})
export class EditReceipePageModule {}
