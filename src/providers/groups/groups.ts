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



  // provider

  // addgroup(newGroup) {
  //   var promise = new Promise((resolve, reject) => {
  //     this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
  //       groupimage: newGroup.groupPic,
  //       msgboard: '',
  //       owner: firebase.auth().currentUser.uid,
  //       openGroup: newGroup.openGroup,
  //       timestamp: firebase.database.ServerValue.TIMESTAMP
  //     }).then(() => {

  //      resolve(true);
  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   });
  //   return promise;
  // }



  
// page

// creategroup() {

//   if (this.opengroup == true) {
//     this.opengrp = true;
//   }
//   else {
//     this.opengrp = false;
//   }
//   var newgroup = {
//     openGroup: this.opengrp,
//     groupName: this.groupname,
//     groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
//   }
//   this.groupservice.addgroup(newgroup).then((res) => {

//     let statusalert = this.alertCtrl.create({
//       buttons: [
//         {
//           text: "Ok",
//           handler: () => {
//             this.groupservice.addmember(this.contactsSelected, newgroup)

//             this.groupservice.getintogroup(this.groupname);
//             this.app.getRootNav().push('GroupchatPage',
//               { groupName: this.groupname });
//           }
//         }]
//     });
//     statusalert.setTitle('Group created succesfully');
//     statusalert.present()


//   }).catch((err) => {
//     alert(JSON.stringify(err));
//   })


// }





// add member 


// addmember(newmember, newgroup) {
//   return new Promise((resolve, reject) => {
//   this.memberadd = [];
//   for (var i = 0; i < newmember.length; i++) {


//     this.firegroup.child(firebase.auth().currentUser.uid).child(newgroup.groupName).child('members').push(newmember[i]).then(() => {
//       this.getgroupimage(newgroup).then(() => {

//         newmember.forEach(value => {
//           this.firegroup.child(value.uid).child(newgroup.groupName).set({
//             groupimage: newgroup.groupPic,
//             openGroup: newgroup.openGroup,
//             owner: firebase.auth().currentUser.uid,
//             msgboard: ''

            
//           }).catch((err) => {
//             console.log(err);
//           })
//         });
//         resolve(true);
//       })
//       this.getintogroup(newgroup.groupNamee);
//     })
//   }
// })
// }




  
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
