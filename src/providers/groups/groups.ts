import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';



@Injectable()

export class GroupsProvider {

  alertController: any;
  
  firedata = firebase.database().ref('/groups1');


  constructor(public afireauth: AngularFireAuth,
    private alertCtrl: AlertController) {
        
  }


  addgroups(newgroup) {
    let promise = new Promise((resolve, reject) => {

      
    this.firedata.push().set(newgroup).then((data)=>{
      console.log(data)
     return resolve({ success: true });
    })
    .catch((err)=>{
     return reject(err);
    })

  });

  return promise
  }

  
  groupList(){
    let promise = new Promise((resolve, reject) => {
    this.firedata.on('value', resp => {
      let groups:any = [];
      groups = snapshotToArray(resp);
      return resolve(groups);
  });
  
    })
    return promise
  }




  FilterList(key,value) {
    // console.log(firebase.auth().currentUser.uid);
    let promise = new Promise((resolve, reject) => {
    
    
      this.firedata.orderByChild(key).equalTo(value).on('value', resp => {
        let users: any = [];
        users = snapshotToArray(resp);
        return resolve(users);
      });

    })
    return promise
  }




  editGroups(groups,id){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('groups1/'+id).update(groups).then(()=>{
    
     return resolve({ success: true });
      })
      .catch((err)=>{
       return reject(err);
      })
  
    })
  
    return promise
    
  }
  
 }







export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}
