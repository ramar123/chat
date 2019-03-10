import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-userreport',
  templateUrl: 'userreport.html',
})

export class UserreportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  gotologout() {

    alert('Are you sure want to Logout?')
    this.navCtrl.push('LoginPage');
  }
}
