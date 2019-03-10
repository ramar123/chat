import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { MessagereportPage } from './messagereport';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MessagereportPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagereportPage),
    IonicModule,
    ComponentsModule
  ],
})
export class MessagereportPageModule {}
