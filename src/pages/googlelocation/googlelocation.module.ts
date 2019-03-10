import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GooglelocationPage } from './googlelocation';

@NgModule({
  declarations: [
    GooglelocationPage,
  ],
  imports: [
    IonicPageModule.forChild(GooglelocationPage),
  ],
})
export class GooglelocationPageModule {}
