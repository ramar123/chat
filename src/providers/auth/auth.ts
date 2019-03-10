
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { usercreds } from '../../models/interfaces/usercreds';
import { Firebase } from '@ionic-native/firebase';
import { Platform, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class AuthProvider {

   firedata = firebase.database().ref('/users');


  
//   email:string;
//   password:any;
//   uid:string;
  
  constructor(private toastr:ToastController, 
    private platform: Platform,
     public afireauth: AngularFireAuth,
      private afs: AngularFirestore) {

}
    
loginUser(credentials: usercreds) {
    try {
      var promise = new Promise((resolve, reject) => {
        this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
          resolve(true);
        }).catch((err) => {
          console.log("error :" + err)
          // var obj=JSON.parse(err)
          this.presentToast("Invalid email address1")
          // console.log("data :"+JSON.stringify(obj))
          if(err=='Error: The email address is badly formatted.')
          this.presentToast("Invalid email address")
          else
          this.presentToast("Invalid password")

          reject(err);
        })
      })

      return promise;
    }
    catch (error) {
      alert("errr")
      
    }}

    
    private async presentToast(message) {
        const toast = await this.toastr.create({
          message: "login success",
          position:"middle",
          duration: 3000
        });
        toast.present();
      }
  
  }





