import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { OpengroupaddPage } from './opengroupadd';
import { DashboardPage } from '../dashboard/dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OpengroupaddPage,
  ],
  imports: [
    IonicPageModule.forChild(OpengroupaddPage),
    IonicModule,
    ComponentsModule
  ],
})
export class OpengroupaddPageModule {}
