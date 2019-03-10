import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Platform, MenuController, NavController, Events, Toast, ToastController, Nav, App, AlertController} from 'ionic-angular';
import {UserProvider} from '../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirstRunPage } from '../pages';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;
  //rootPage:any = Dashbord1Page;

  // rootPage: any = LoginPage;
  rootPage = FirstRunPage;

  submenus: Array<{ title: string, component: any }>;
  mainmenus: Array<{ title: string, component: any }>;
  shownGroup = null;



  constructor(platform: Platform, statusBar: StatusBar,
    private menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public afireauth: AngularFireAuth,
    private user:UserProvider,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.mainmenus = [


      ];
      this.submenus = [
        {
          title: 'Topic1',
          component: 'Topic1Page',
        },
        {
          title: 'Topic1',
          component: 'Topic1Page',
        },
        {
          title: 'Topic1',
          component: 'Topic1Page',
        },
      ]
    });
  }




  gotolinkususermaster(){
    this.nav.push('LinkususermasterPage');
  }

  // gotoanalyticsreport(){
  //   this.nav.setRoot(AnalyticsreportPage);
  // }

  gotolinkusgroupmaster(){
    this.nav.setRoot('LinkusgroupmasterPage');
  }


  gotolinkusopengroup(){
    this.nav.setRoot('OpengroupPage');

  }


  gotouserreport(){
    this.nav.setRoot('UserreportPage');
  }



  gotomessagereport(){
    this.nav.setRoot('MessagereportPage');
  }


  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  gotologout() {
    this.menuCtrl.close();
    let confirm = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you wish to logout ?',
        buttons: [
            {
                text: 'Cancel',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    console.log('Agree clicked');
                    this.user.isAuth=false;
                    localStorage.clear();
                    this.afireauth.auth.signOut();
                    this.nav.setRoot('LoginPage');
                   
                   
                }
            }
        ]
    });
    confirm.present();
    
}
}    
