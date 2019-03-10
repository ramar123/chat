import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';



@Injectable()

export class UserProvider {
  // register: any;
  alertController: any;
  // register:any[];
  isAuth: boolean = false;
  firedata = firebase.database().ref('/users');

  constructor(public afireauth: AngularFireAuth,

    private alertCtrl: AlertController) {
    localStorage.getItem('login') ? this.isAuth = true : this.isAuth = false;
  }


adduser(newuser) {
// console.log("RAMAR", +JSON.stringify(newuser));
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then((user: any) => {
          this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        }).then(() => {
        
        this.firedata.child(this.afireauth.auth.currentUser.uid).set({
         uid: this.afireauth.auth.currentUser.uid,
         userStatus:'Active',
         status: "offline",
         DeviceId:'0',
         displayName:newuser.displayName,
        //  branchid:newuser.branchid,
         branchname:newuser.branchname,
        //  userStatus:newuser.userStatus,
         employee:newuser.employee,
         email:newuser.email,
         extension:newuser.extension,
         mobilenumber:newuser.mobilenumber,
         password:newuser.password,
         contacttype:newuser.contacttype,
         department:newuser.department,
         designation:newuser.designation,
         DOB:newuser.DOB,
         DOJ:newuser.DOJ,
         gender:newuser.gender,
         landline:newuser.landline,
         language:newuser.language,
         location:newuser.location,
         mobilelogin:newuser.mobilelogin,
         weblogin:newuser.weblogin,
         deviceres:newuser.deviceres,
         created_at:firebase.database.ServerValue.TIMESTAMP,
         photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
                     
       }).then(() => {
        resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }



  LoginAuthentication(email,employee,mobilenumber)
  {
    var promise = new Promise((resolve, reject) => {
       firebase.database().ref('/users').orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
console.log(userdata);
        var Flag="0";
        for (var key in userdata) {
         
         // console.log(userdata[key].email);
          if(userdata[key].email== email)

          {
  //  alert("email already exists");
   console.log('email already exists');

          }
          if(userdata[key].employee== employee)

          {
  //  alert("email already exists");
   console.log('email already exists');


          }
          if(userdata[key].mobilenumber== mobilenumber)

          {
  //  alert("email already exists");
   console.log('email already exists');


          }
   else{
   Flag=userdata[key].email;
        }
      }
        resolve({ success: Flag });
      
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }




  userList() {
    console.log(firebase.auth().currentUser.uid);
    let promise = new Promise((resolve, reject) => {
        this.firedata.orderByChild('created_at').on('value', resp => {
        let users: any = [];
        users = snapshotToArray(resp);
        console.log(users);
       // users = snapshotToArray(this.reverseObject(resp));
        return resolve(users);
      });

    })
    return promise
  }







//   reverseObject(created_at) {
//     var newObject = {};
//     var keys = [];

//     for (var key in created_at) {
//         keys.push(created_at);
//     }

//     for (var i = keys.length - 1; i >= 0; i--) {
//         var value = created_at[keys[i]];
//         newObject[keys[i]]= value;
//     }       

//     return newObject;
// }





//   firebase.database().ref(endpoint)
//   .orderByChild('timestamp')
//   .on('value', function(snapshot) {
//   this.data = [];

//   snapshot.forEach(function(child) {
//     this.data.push(child.val());
//   }.bind(this));

//   console.log("all", data.map(function(val) { return new Date(val.timestamp).toString(); }));
// });


  // userList(){
  // const feedRef = database.ref('user');
  // var feed = [];
  // feedRef.orderByChild('timestamp').on('value', (snapshot, error) => {
  //     snapshot.forEach((branchname) => {
  //         const duck = branchname.val()
  //         console.log(branchname.key+'='+duck.name);
  //         feed.push(duck);
  //     });
  // });
  // console.log(feed);
  // }



  FilterList(key,value) {
    // console.log(firebase.auth().currentUser.uid);
    let promise = new Promise((resolve, reject) => {
           this.firedata.orderByChild(key).equalTo(value).on('value', resp => {
        let users: any = [];
        users = snapshotToArray(resp);
        console.log(users);
        return resolve(users);
      });

    })
    return promise
  }





  // updateInfo() {
  //   let editinfo = firebase.database().ref('users/'+this.route.snapshot.paramMap.get('key')).update(this.userForm.value);
  //   this.router.navigate(['/detail/'+this.route.snapshot.paramMap.get('key')]);
  // }






  delete(id) {
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('users/' + id).update({userStatus: status }).then(() => {
         return resolve({ success: true });
      })
        .catch((err) => {
          return reject(err);
        })

    })

    return promise


  }




  editUser(user, id) {
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('users/' + id).update(user).then(() => {

        return resolve({ success: true });
      })
        .catch((err) => {
          return reject(err);
        })

    })

    return promise

  }

  getUserByID(key){
    
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('users/' + key).once('value', (snapshot) => {
        return resolve(snapshot.val());
      })
      .catch((err) => {
        return reject(err);
      })
    })
      return promise;
  
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
