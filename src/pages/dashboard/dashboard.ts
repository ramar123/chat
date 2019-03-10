import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Platform, MenuController, NavController, Events, Toast, ToastController, Nav, App, AlertController} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar,
    private menuCtrl: MenuController,
    private navCtrl:NavController,
    public alertCtrl: AlertController,
    public afireauth: AngularFireAuth,
    private user:UserProvider,
    splashScreen: SplashScreen)
{
}



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



  gotolinkusgroupaccess(){
    this.navCtrl.setRoot('LinkusgroupaccessPage');
  }


  
//   gotologout() {
//     this.menuCtrl.close();
//     let confirm = this.alertCtrl.create({
//         title: 'Confirm',
//         message: 'Do you wish to logout ?',
//         buttons: [
//             {
//                 text: 'Cancel',
//                 handler: () => {
//                     console.log('Disagree clicked');
//                 }
//             },
//             {
//                 text: 'Ok',
//                 handler: () => {
//                     console.log('Agree clicked');
//                     this.user.isAuth=false;
//                     localStorage.clear();
//                     this.afireauth.auth.signOut();
//                     this.navCtrl.setRoot(LoginPage);
                   
                   
//                 }
//             }
//         ]
//     });
//     confirm.present();
    
// }

gotologout(){
  this.navCtrl.push('LoginPage');
}

}
