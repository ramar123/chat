import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LinkusaddmastertypePage } from '../linkusaddmastertype/linkusaddmastertype';



@IonicPage()
@Component({
  selector: 'page-mastertype',
  templateUrl: 'mastertype.html',
})
export class MastertypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MastertypePage');
  }
  gotoaddmastertype(){
    this.navCtrl.push(LinkusaddmastertypePage);
  }

  gotolinkusaddmastertype(){
    this.navCtrl.push(LinkusaddmastertypePage);
  }
}
