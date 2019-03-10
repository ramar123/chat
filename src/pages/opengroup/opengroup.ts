import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { GroupopenProvider } from '../../providers/groupopen/groupopen';
import { PagerService } from '../../app/services'


@IonicPage()

@Component({
  selector: 'page-opengroup',
  templateUrl: 'opengroup.html',
})


export class OpengroupPage {


  groupsList: any=[];
  groupname;any;


       //pagination
       pager: any = {};
       pagedItems: any[];
       limit:number=10;



  constructor(public navCtrl: NavController,
    private groupopen:GroupopenProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private pagerService: PagerService,
    public alertCtrl: AlertController,

     public navParams: NavParams) {

      this.filterUser('GroupStatus','Active');

    }


    setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
  
      // get pager object from service
      this.pager = this.pagerService.getPager(this.groupsList.length, page, this.limit);
  
      // get current page of items
      this.pagedItems = this.groupsList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  filterUser(key,value){
    this.groupopen.FilterList(key,value).then((data)=>{
      console.log(data)
      this.groupsList=data;
      this.setPage(1);
      console.log(this.groupsList);
    })
  }
  
  changeLimit(limit){
    this.limit=limit;
    this.filterUser('GroupStatus','Active');
  }




  filterUser1(){
   
    var q = this.groupname;
    if (q.trim() == '') {
     this.filterUser('GroupStatus','Active');
  return;
    }
  console.log(this.groupname)
    
    this.pagedItems = this.groupsList.filter((v) => {
      if (v.groupname.toLowerCase().indexOf(q.toLowerCase()) > -1  ) {
          return true;
      }
      return false;
    })
}


     gotoopengroupadd(groups){
      let Modal = this.modalCtrl.create('OpengroupaddPage');
      Modal.present();
  
    }



      close() {
        this.viewCtrl.dismiss();
    }
    

 

      
  deleteGroup(groups){

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
                  groups.GroupStatus='Inactive',
                  this.groupopen.editGroups(groups,groups.id).then((data)=>{
                    this.filterUser('GroupStatus','Active');
                }).catch((err)=>{
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
  

  editGroups(groups){
    let Modal = this.modalCtrl.create('OpengroupaddPage',{userpass:groups});
    Modal.present();

      }
    }














// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
// import { LinkusaddgroupmasterPage } from '../linkusaddgroupmaster/linkusaddgroupmaster';
// import { OpengroupaddPage } from '../opengroupadd/opengroupadd';
// import { GroupopenProvider } from '../../providers/groupopen/groupopen';
// import { LoginPage } from '../login/login';


// @IonicPage()

// @Component({
//   selector: 'page-opengroup',
//   templateUrl: 'opengroup.html',
// })


// export class OpengroupPage {


//   groupsList: any=[];
//   groupname;any;

//   temparr=[];

//   constructor(public navCtrl: NavController,
//     private groupopen:GroupopenProvider,
//     public modalCtrl: ModalController,
//     public viewCtrl: ViewController,
//     public alertCtrl: AlertController,

//      public navParams: NavParams) {

//       this.getopenGroup();

//      }


//      gotoopengroupadd(groups){
//       let Modal = this.modalCtrl.create(OpengroupaddPage);
//       Modal.present();
  
//        }



//       close() {
//         this.viewCtrl.dismiss();
//     }
    



//   filterUser1(){

    
//     var q = this.groupname;
//       if (q.trim() == '') {
//         this.getopenGroup();
//         return;
//       }
//     console.log(this.groupname)
//       this.groupsList = this.groupsList.filter((v) => {
//         if (v.groupname.toLowerCase().indexOf(q.toLowerCase()) > -1  ) {
        
//          return true;
//         }
//         return false;
//       })
//   }

      


      
//   filterGroup(key,value){
//     this.groupopen.FilterList(key,value).then((data)=>{
//       console.log(data)
//       this.groupsList=data;
//     })
//   }


    



//   onChangeGroup(value){
//     console.log(value)
//     this.filterGroup('groupname',value);
//   }



//   getopenGroup(){
//     this.groupopen.groupList().then((data)=>{
//       console.log(data);
//       this.groupsList=data;
 
//     })
//   }


      
//   deleteGroup(groups){

//     let confirm = this.alertCtrl.create({
//       title: 'Confirm',
//       message: 'Do you wish to change status ?',
//       buttons: [
//           {
//               text: 'Cancel',
//               handler: () => {
//                   console.log('Disagree clicked');
//               }
//           },
//           {
//               text: 'Ok',
//               handler: () => {
//                   console.log('Agree clicked');
//                   groups.GroupStatus='Inactive',
//                   this.groupopen.editGroups(groups,groups.id).then((data)=>{
//                     this.getopenGroup();
//                 }).catch((err)=>{
//                     console.log(err)
//                 })
            
                                 
//               }
//           }
//       ]
//   });
//   confirm.present();

  
//   }


//   gotologout(){
//     this.navCtrl.push(LoginPage);
//   }
  

//   editGroups(groups){
//     let Modal = this.modalCtrl.create(OpengroupaddPage,{userpass:groups});
//     Modal.present();

//       }
//     }

