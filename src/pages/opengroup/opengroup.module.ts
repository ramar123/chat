import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { OpengroupPage } from './opengroup';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OpengroupPage,
  ],
  imports: [
    IonicPageModule.forChild(OpengroupPage),
    IonicModule,
    ComponentsModule
  ],
})
export class OpengroupPageModule {}
