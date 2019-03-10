import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LinkusgroupmasterPage } from './linkusgroupmaster';
import { DashboardPage } from '../dashboard/dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinkusgroupmasterPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkusgroupmasterPage),
    IonicModule,
    ComponentsModule
  ],
})
export class LinkusgroupmasterPageModule {}
