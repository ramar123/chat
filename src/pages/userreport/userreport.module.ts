import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { UserreportPage } from './userreport';
import { DashboardPage } from '../dashboard/dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserreportPage,
  ],
  
  imports: [
    IonicPageModule.forChild(UserreportPage),
    IonicModule,
    ComponentsModule

  ],
})
export class UserreportPageModule {}
