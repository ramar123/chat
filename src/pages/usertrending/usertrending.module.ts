import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { UsertrendingPage } from './usertrending';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UsertrendingPage,
  ],

  imports: [
    IonicPageModule.forChild(UsertrendingPage),
    IonicModule,
    ComponentsModule
  ],
})


export class UsertrendingPageModule {}
