import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController, MenuController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PagerService } from '../../app/services'
// import { AngularFireDatabase } from 'angularfire2/database';




@IonicPage()
@Component({
  selector: 'page-linkususermaster',
  templateUrl: 'linkususermaster.html',
})


export class LinkususermasterPage {

  temparr = [];

  users: any = [];


  branch;
  mobilenumber;
  email;
  branchname;
  value;
  status;
  branchdata
  pager: any = {};
  pagedItems: any[];
  limit:number=10;
  selectedLeave : string = '';
  options;



  constructor(public navCtrl: NavController,
    private user: UserProvider,
    public modalCtrl: ModalController,
    private menuCtrl: MenuController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private pagerService: PagerService,
    public afireauth: AngularFireAuth,
    public navParams: NavParams) {
    this.filterUser('userStatus','Active');
    this.options="25";
    
  }



  
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.length, page, this.limit);

    // get current page of items
    this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


filterUser(key, value) {
 
  // alert("filterUser : "+key+""+value);
  this.user.FilterList(key, value).then((data) => {
 
    this.users = data;
    this.setPage(1);
    console.log(this.users);
  })
}




changeLimit(limit){
  this.limit=limit;
 this.filterUser('userStatus','Active');
}

  dismiss() {
    this.viewCtrl.dismiss();
  }




  gotolinkusaddusermaster(user) {
    console.log(user)
    let Modal = this.modalCtrl.create('LinkusaddusermasterPage');
    Modal.present();
  }



 

  filterUser1() {

    //  alert("filterUser1");
    var q = this.branch;
    if (q.trim() == '') {
      this.filterUser('userStatus','Active');
      return;

    }
    console.log(this.branch)
    console.log(this.users);
    this.pagedItems = this.users.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {

        return true;
      }
      return false;
    })
  }


  filterUser2() {

    //  alert("filterUser1");
    var q = this.email;
    if (q.trim() == '') {
    this.filterUser('userStatus','Active');
      return;
    }
    console.log(this.email)
    console.log(this.users);
    this.pagedItems = this.users.filter((v) => {
      if (v.email.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }



  filterUser3() {

    var q = this.mobilenumber.toString();
    console.log(q)
    if (q.trim() == '') {
      this.filterUser('userStatus','Active');
      return;
    }
    console.log(this.mobilenumber)
    console.log(this.users);
    this.pagedItems = this.users.filter((v) => {
    
      console.log(this.mobilenumber);
      console.log(v.mobilenumber);

      if (v.mobilenumber) {
        v.mobilenumber=v.mobilenumber.toString();
        if (v.mobilenumber.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
      }

      return false;
    })

  }





  editUser(user) {
    let Modal = this.modalCtrl.create('LinkusaddusermasterPage', { userpass: user });
    Modal.present();
    // this.navCtrl.push(LinkusaddusermasterPage, { userpass: user });
  }


  deleteUser(user) {

    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you wish to change status ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            user.userStatus = 'Inactive',
              this.user.editUser(user, user.id).then((data) => {
                this.filterUser('userStatus','Active');
              }).catch((err) => {
                console.log(err)
              })
        

          }
        }
      ]
    });
    confirm.present();

  }


  gotologout() {

    alert('Are you sure want to Logout?')
    this.navCtrl.push('LoginPage');
  }


}



// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController, MenuController } from 'ionic-angular';
// import { UserProvider } from '../../providers/user/user';
// import { Pipe, PipeTransform } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { PagerService } from '../../app/services'


// @IonicPage()
// @Component({
//   selector: 'page-linkususermaster',
//   templateUrl: 'linkususermaster.html',
// })


// export class LinkususermasterPage {

//   temparr = [];

//   users: any = [];

//   branch;
//   mobilenumber;
//   email;
//   branchname;

//   pager: any = {};
//   pagedItems: any[];
//   limit:number=10;
//   selectedLeave : string = '';

//    constructor(public navCtrl: NavController,
//     private user: UserProvider,
//     public modalCtrl: ModalController,
//     private menuCtrl: MenuController,
//     public viewCtrl: ViewController,
//     public alertCtrl: AlertController,
//     private pagerService: PagerService,
//     public afireauth: AngularFireAuth,
//     public navParams: NavParams) {
//     this.filterUser('userStatus','Active');
  
//   }



//   setPage(page: number) {
//     if (page < 1 || page > this.pager.totalPages) {
//         return;
//     }

//    this.pager = this.pagerService.getPager(this.users.length, page, this.limit);

//    this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }


// filterUser(key, value) {
//   console.log(key,value);
//   this.user.FilterList(key, value).then((data) => {
//     console.log(data)
//     this.users = data;
//     this.setPage(1);
//     console.log(this.users);
//   })
// }



// changeLimit(limit){
//   this.limit=limit;
//   this.filterUser('userStatus','Active');
// }

//   dismiss() {
//     this.viewCtrl.dismiss();
//   }


//   gotolinkusaddusermaster(user) {
//     console.log(user)
//     let Modal = this.modalCtrl.create('LinkusaddusermasterPage');
//     Modal.present();
//   }
 

//   filterUser1() {

  
//     var q = this.branch;
//     if (q.trim() == '') {
//       this.filterUser('userStatus','Active');
//       return;

//     }
//     console.log(this.branch)
//     console.log(this.users);
//     this.pagedItems = this.users.filter((v) => {
//       if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {

//         return true;
//       }
//       return false;
//     })
//   }


//   filterUser2() {

 
//     var q = this.email;
//     if (q.trim() == '') {
//       this.filterUser('userStatus','Active');
//       return;
//     }
//     console.log(this.email)
//     console.log(this.users);
//     this.pagedItems = this.users.filter((v) => {
//       if (v.email.toLowerCase().indexOf(q.toLowerCase()) > -1) {
//         return true;
//       }
//       return false;
//     })
//   }



//   filterUser3() {

//     var q = this.mobilenumber.toString();
//     console.log(q)
//     if (q.trim() == '') {
//       this.filterUser('userStatus','Active');
//       return;
//     }
//     console.log(this.mobilenumber)
//     console.log(this.users);
//     this.pagedItems = this.users.filter((v) => {
    
//       console.log(this.mobilenumber);
//       console.log(v.mobilenumber);

//       if (v.mobilenumber) {
//         v.mobilenumber=v.mobilenumber.toString();
//         if (v.mobilenumber.toLowerCase().indexOf(q.toLowerCase()) > -1) {
//           return true;
//         }
//       }

//       return false;
//     })

//   }



//   editUser(user) {
//     let Modal = this.modalCtrl.create('LinkusaddusermasterPage', { userpass: user });
//     Modal.present();
//  }


//   deleteUser(user) {

//     let confirm = this.alertCtrl.create({
//       title: 'Confirm',
//       message: 'Do you wish to change status ?',
//       buttons: [
//         {
//           text: 'Cancel',
//           handler: () => {
//             console.log('Disagree clicked');
//           }
//         },
//         {
//           text: 'Ok',
//           handler: () => {
//             console.log('Agree clicked');
//             user.userStatus = 'Inactive',
//               this.user.editUser(user, user.id).then((data) => {
//                 this.filterUser('userStatus','Active');
//               }).catch((err) => {
//                 console.log(err)
//               })
//            }
//         }
//       ]
//     });
//     confirm.present();

//   }

//   gotologout() {

//     alert('Are you sure want to Logout?')
//     this.navCtrl.push('LoginPage');
//   }


// }
