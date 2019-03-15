import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {snapshotToArray} from '../user/user';

@Injectable()
export class AnalysticsProvider {


  firedata = firebase.database().ref('/users');
  firegroup = firebase.database().ref('/groups');
  firegroupmessages = firebase.database().ref('/groups');
  fireopengroup = firebase.database().ref('/opengroups1');
  firebudddychats = firebase.database().ref('/buddychats');



  
temparr =[];
todayuser = [];
  constructor(
    public afireauth: AngularFireAuth,
    private afs: AngularFirestore) {

  }
  
  
  
  
  getallusers() {
  var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];

        for (var key in userdata) {
          if(userdata[key].uid!=this.afireauth.auth.currentUser.uid)
          {
            temparr.push(userdata[key]);
          }
        }
       
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise; 
  }



  getallGroups() {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];

        for (var key in userdata) {
          if(userdata[key].uid!=this.afireauth.auth.currentUser.uid)
          {
            temparr.push(userdata[key]);
          }       
      }
       
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  getinactiveGroups() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
    
        for (var key in userdata) {
          if(userdata[key].userStatus=="Inactive")
          {
            temparr.push(userdata[key]);
         
          }
        }
        console.log("temparr" +JSON.stringify(temparr));
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }




  getActiveUser() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
    
        for (var key in userdata) {
          if(userdata[key].userStatus=="Active")
          {
            temparr.push(userdata[key]);
         
          }
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  getRemovedUser() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
    
        for (var key in userdata) {
          if(userdata[key].userStatus=="Inactive")
          {
            temparr.push(userdata[key]);
         console.log("temparrinacttt" +temparr)
          }
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }




  gettodayInActiveUser() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
    
        for (var key in userdata) {
          if(userdata[key].userStatus=="Inactive")
          {
            temparr.push(userdata[key]);
         
          }
        }
        console.log("temparr" +JSON.stringify(temparr));
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }





  getOpengroup()
  {
    var promise = new Promise((resolve, reject) => {
      this.fireopengroup.once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];

        for (var key in userdata) {
          if(userdata[key].uid!=this.afireauth.auth.currentUser.uid)
          {
            temparr.push(userdata[key]);
          }      
      }     
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;

  }

  getTotalmessages(){
    var promise = new Promise((resolve, reject) => {
      this.firebudddychats.orderByChild('uid').once('value', (snapshot) => {
       
        let userdata = snapshot.val();
        let temparr = [];
        let ss =[];
       var i=0;
       
        for (var key in userdata ){
      
            for(var getobj in userdata[key])
            {
              for(var getdata in userdata[key][getobj] )
              {
               i++;
                
              }
            }
        }
       
        resolve(i);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise; 
  }

  getallGroupmessages() {
    var promise = new Promise((resolve, reject) => {
      this.firegroupmessages.once('value', (snapshot) => {
        // var userdata = snapshot.val();
       
        // snapshot.forEach(element => {
        //   console.log("get ket:"+element.key)
        // });

        resolve(snapshot);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
 

  getYearTotalmessages() {
    var promise = new Promise((resolve, reject) => {
      this.firebudddychats.orderByChild('uid').once('value', (snapshot) => {
       
        let userdata = snapshot.val();
        let temparr = [];
        let ss =[];
       var i=0;

        for (var key in userdata ){
      
            for(var getobj in userdata[key])
            {
            
              for(var getdata in userdata[key][getobj] )
              {
               i++;
               temparr.push(userdata[key][getobj][getdata]);
                
              }
            }
        }
       
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise; 
  }


  getMessages(){
    let promise = new Promise((resolve, reject) => {
      this.firebudddychats.orderByChild('created_at').on('value', resp => {
      let users: any = [];
      users = snapshotToArray(resp);
      console.log(" logusers" +JSON.stringify(users));
      return resolve(users);
    });

  })
  return promise
  }

  
}

