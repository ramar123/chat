import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()

@Component({
  selector: 'page-linkusgroupaccess',
  templateUrl: 'linkusgroupaccess.html',
})



export class LinkusgroupaccessPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  gotologout() {

    alert('Are you sure want to Logout?')
    this.navCtrl.push('LoginPage');
  }

}
