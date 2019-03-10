import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { LinkususermasterPage } from './linkususermaster';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinkususermasterPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkususermasterPage),
    IonicModule,
    ComponentsModule
  ],
})
export class LinkususermasterPageModule {}
