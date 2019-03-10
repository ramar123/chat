import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MastertypePage } from '../mastertype/mastertype';
import { LinkusmasterdataPage } from '../linkusmasterdata/linkusmasterdata';
import { LinkususermasterPage } from '../linkususermaster/linkususermaster';
import { LinkusaddusermasterPage } from '../linkusaddusermaster/linkusaddusermaster';
import { LinkusgroupmasterPage } from '../linkusgroupmaster/linkusgroupmaster';



@IonicPage()
@Component({
  selector: 'page-linkusdashboard',
  templateUrl: 'linkusdashboard.html',
})


export class LinkusdashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkusdashboardPage');
  }

gotomastertype(){
this.navCtrl.push(MastertypePage);
  }

  gotomasterdata(){
    this.navCtrl.setRoot(LinkusmasterdataPage);

  }

  gotolinkususermaster(){
    this.navCtrl.setRoot(LinkususermasterPage);
  }


  gotolinkusgroupmaster(){
    this.navCtrl.setRoot(LinkusgroupmasterPage);
  }
}
