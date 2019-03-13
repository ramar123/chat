import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Platform, MenuController, NavController, Events, Toast, ToastController, Nav, App, AlertController} from 'ionic-angular';



@Component({
  selector: 'layout',
  templateUrl: 'layout.html'
})

export class LayoutComponent {

  text: string;


  constructor(platform: Platform, statusBar: StatusBar,
    private menuCtrl: MenuController,
    private navCtrl:NavController,
    public alertCtrl: AlertController,
    splashScreen: SplashScreen)
{
}



  // constructor() {
    
  //   // console.log('Hello LayoutComponent Component');
  //   // this.text = 'Hello World';
  // }


  gotolinkususermaster(){
    this.navCtrl.setRoot('LinkususermasterPage');
  }

  gotolinkusgroupmaster(){
    this.navCtrl.setRoot('LinkusgroupmasterPage');
  }


  gotolinkusopengroup(){
    this.navCtrl.setRoot('OpengroupPage');

  }


  gotolinkususerreport(){
    this.navCtrl.setRoot('UserreportPage');
  }


  gotolinkusanalytics(){
    this.navCtrl.setRoot('LinkusAnalyticsPage');

  }

  gotomessagereport(){
    this.navCtrl.setRoot('MessagereportPage');
  }

  gotousertrending(){
    this.navCtrl.setRoot('UsertrendingPage');

  }


  gotolinkusgroupaccess(){
    this.navCtrl.setRoot('LinkusgroupaccessPage');
  }

  gotoreadanalysis(){
    this.navCtrl.setRoot('ReadanalysisPage');

  }

}
