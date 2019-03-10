import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MastertypePage } from './mastertype';

@NgModule({
  declarations: [
    MastertypePage,
  ],
  imports: [
    IonicPageModule.forChild(MastertypePage),
  ],
})
export class MastertypePageModule {}
