import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LinkusaddmasterdataPage } from '../linkusaddmasterdata/linkusaddmasterdata';



@IonicPage()
@Component({
  selector: 'page-linkusmasterdata',
  templateUrl: 'linkusmasterdata.html',
})
export class LinkusmasterdataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkusmasterdataPage');
  }


  gotolinkusaddmasterdata(){
    this.navCtrl.push(LinkusaddmasterdataPage);
  }

}
