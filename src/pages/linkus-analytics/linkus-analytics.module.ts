import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { LinkusAnalyticsPage } from './linkus-analytics';
import {ComponentsModule} from '../../components/components.module'

@NgModule({
  declarations: [
    LinkusAnalyticsPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkusAnalyticsPage),
    IonicModule,
    ComponentsModule
  ],
})
export class LinkusAnalyticsPageModule {}
