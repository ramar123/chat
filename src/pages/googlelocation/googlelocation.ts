import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()

@Component({
  selector: 'page-googlelocation',
  templateUrl: 'googlelocation.html',
})


export class GooglelocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currlatLng:any;
  currlatLongng:any;

  screen: any;
  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  





  // ionViewWillEnter() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     usersLocation.lat = resp.coords.latitude;
  //     usersLocation.lng = resp.coords.longitude;
  //     //Call to your logic HERE
  //   }).catch((error) => {
  //     alert(error);
  //   });
  // }


}
