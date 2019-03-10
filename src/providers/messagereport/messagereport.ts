import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';




@Injectable()  

export class MessagereportProvider {

  firebudddychats = firebase.database().ref('/buddychats');


  
  temparr =[];
  
  
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
}
