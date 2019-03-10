import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LinkusaddusermasterPage } from './linkusaddusermaster';
import { DashboardPage } from '../dashboard/dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinkusaddusermasterPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkusaddusermasterPage),
    IonicModule,
    ComponentsModule
  ],
})
export class LinkusaddusermasterPageModule {}
