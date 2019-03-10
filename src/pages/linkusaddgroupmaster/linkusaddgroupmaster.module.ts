import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LinkusaddgroupmasterPage } from './linkusaddgroupmaster';
import { DashboardPage } from '../dashboard/dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinkusaddgroupmasterPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkusaddgroupmasterPage),
    IonicModule,
    ComponentsModule
  ],
})
export class LinkusaddgroupmasterPageModule {}
