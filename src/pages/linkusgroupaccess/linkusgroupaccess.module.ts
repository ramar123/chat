import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LinkusgroupaccessPage } from './linkusgroupaccess';
import { DashboardPage } from '../dashboard/dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinkusgroupaccessPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkusgroupaccessPage),
    IonicModule,
    ComponentsModule
  ],
})
export class LinkusgroupaccessPageModule {}
