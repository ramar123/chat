 import { Component } from '@angular/core';
 import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
 import { GroupsProvider } from '../../providers/groups/groups';
 import { PagerService } from '../../app/services'


 @IonicPage()

  @Component({
    selector: 'page-linkusgroupmaster',
    templateUrl: 'linkusgroupmaster.html',
  })
 
  export class LinkusgroupmasterPage {
   name: any;

    groupsList:any=[];
    groupname:any;


     //pagination
  pager: any = {};
  pagedItems: any[];
  limit:number=10;

    
   constructor(public navCtrl: NavController,
    private groups:GroupsProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private pagerService: PagerService,
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
  this.groups.FilterList(key,value).then((data)=>{
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




  // filterUser1(){

  //     var q = this.name;
  //     if (q.trim() == '') {
  //       this.filterUser('GroupStatus','Active');
  //       return;
  //     }
  //   console.log(this.groupname)
  //   this.pagedItems = this.groupsList.filter((v) => {
  //     if (v.groupname.toLowerCase().indexOf(q.toLowerCase()) > -1) {

  //       return true;
  //     }
  //     return false;
  //   })
  // }

 

  close() {
    this.viewCtrl.dismiss();
}

   
  gotolinkusaddgroupmaster(groups) {
    let Modal = this.modalCtrl.create('LinkusaddgroupmasterPage');
    Modal.present();
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
                  this.groups.editGroups(groups,groups.id).then((data)=>{
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
    let Modal = this.modalCtrl.create('LinkusaddgroupmasterPage',{userpass:groups});
    Modal.present();

      }
    }




  //   import { Component } from '@angular/core';
  //   import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
  //   import { LinkusaddgroupmasterPage } from '../linkusaddgroupmaster/linkusaddgroupmaster';
  //   import { GroupsProvider } from '../../providers/groups/groups';
  //  import { LoginPage } from '../login/login';
   
   
  //   @IonicPage()
  //    @Component({
  //      selector: 'page-linkusgroupmaster',
  //      templateUrl: 'linkusgroupmaster.html',
  //    })
    
  //    export class LinkusgroupmasterPage {
   
  //      length:any;
  //      groupsList:any=[];
  //      groupname:any;
  //      users:any=[]
  //      pageSize;
  //      currentPage;
  //     temparr=[];
   
       
  //     constructor(public navCtrl: NavController,
  //      private groups:GroupsProvider,
  //      public modalCtrl: ModalController,
  //      public alertCtrl: AlertController,
  //      public viewCtrl: ViewController,
  //       public navParams: NavParams) {
  //        this.currentPage = 0;
  //        this.pageSize = 10;
  //        this.getGroups();
         
        
  //     }
   
  //     gotolinkusaddusermaster(groups){
  //      let Modal = this.modalCtrl.create(LinkusaddgroupmasterPage);
  //      Modal.present();
  //        }
   
   
   
  //    filterUser1(){
   
  //        var q = this.groupname;
  //        if (q.trim() == '') {
  //          this.getGroups();
  //          return;
  //        }
  //      console.log(this.groupname)
  //        console.log(this.users);
  //        this.groupsList = this.groupsList.filter((v) => {
  //          if (v.groupname.toLowerCase().indexOf(q.toLowerCase()) > -1  ) {
           
  //           return true;
  //          }
  //          return false;
  //        })
  //    }
   
   
  //    close() {
  //      this.viewCtrl.dismiss();
  //  }
   
   
  //  pageSizeUser;
  //  numberOfPages(){
  //    console.log(this.pageSize);
  //    console.log(Math.floor(this.users.length/this.pageSize))
  //    console.log(Math.floor(this.users.length/this.pageSize - 1));
  //    this.pageSizeUser = Math.floor(this.users.length/this.pageSize - 1);
  //    console.log(this.pageSizeUser);
  //      return Math.floor(this.users.length/this.pageSize);                
  //  }
  //  event(){
  //    this.currentPage=this.currentPage+1
  //    this.users=this.users.slice(0,this.pageSize)
  //  }
   
   
     
  //    filterGroup(key,value){
  //      this.groups.FilterList(key,value).then((data)=>{
  //        console.log(data)
  //        this.groupsList=data;
  //      })
  //    }
   
   
   
  //    onChangeGroup(value){
  //      console.log(value)
  //      this.filterGroup('groupname',value);
  //    }
   
   
   
  //     getGroups(){
  //      this.groups.groupList().then((data)=>{
  //        console.log(data);
  //        this.groupsList=data;
  //      })
  //    }
   
   
   
   
  //    deleteGroup(groups){
   
  //      let confirm = this.alertCtrl.create({
  //        title: 'Confirm',
  //        message: 'Do you wish to change status ?',
  //        buttons: [
  //            {
  //                text: 'Cancel',
  //                handler: () => {
  //                    console.log('Disagree clicked');
  //                }
  //            },
  //            {
  //                text: 'Ok',
  //                handler: () => {
  //                    console.log('Agree clicked');
  //                    groups.GroupStatus='Inactive',
  //                    this.groups.editGroups(groups,groups.id).then((data)=>{
  //                      this.getGroups();
  //                  }).catch((err)=>{
  //                      console.log(err)
  //                  })
                    
                                    
  //                }
  //            }
  //        ]
  //    });
  //    confirm.present();
   
  //      }
   
  //      gotologout(){
  //        this.navCtrl.push(LoginPage);
  //      }
       
   
   
   
  //    editGroups(groups){
  //      let Modal = this.modalCtrl.create(LinkusaddgroupmasterPage,{userpass:groups});
  //      Modal.present();
   
  //        }
  //      }
   

    



