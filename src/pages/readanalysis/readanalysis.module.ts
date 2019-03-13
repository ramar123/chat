import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ReadanalysisPage } from './readanalysis';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReadanalysisPage,
  ],
  
  imports: [
    IonicPageModule.forChild(ReadanalysisPage),
    IonicModule,
    ComponentsModule
  ],
})
export class ReadanalysisPageModule {}
