import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GroupopenProvider } from '../../providers/groupopen/groupopen';
import { UserProvider } from '../../providers/user/user';
import {Autocomplete} from '../../shared/autocomplete/autocomplete';

import { Keyboard } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-opengroupadd',
  templateUrl: 'opengroupadd.html',
})


export class OpengroupaddPage {
    displayName: string;

    key: any;
    selectgroup: any;
    getData: any;

  sendata: any;
  toast: any;
  message: string;
  error: string;
  data: any;

  searchTerm='';
  searchList:any;
  private GroupForm: FormGroup;

  groupname: FormControl;
  members: FormControl;

  users: any = [];

  userIds: any = [];

  public input: string = '';
  searching: any = false;
 

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    private groupopen: GroupopenProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
    private user: UserProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {

      this.getData = this.navParams.get('userpass')
      console.log(this.getData);

     this.getUsers();

    this._formGroup();
}


_formGroup() {
    let emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";


    this.GroupForm = this.fb.group({

        'groupname': ['', Validators.compose([Validators.required])],
        'members': ['', Validators.compose([Validators.required])],
    });

    if (this.getData) {

        this.GroupForm.controls['groupname'].setValue(this.getData.groupname);
        this.GroupForm.controls['members'].setValue(this.getData.members);
        this.userIds = this.getData.userids;

    }

}


validateAllFormFields(formGroup: FormGroup) {
let errorField: any;
Object.keys(formGroup.controls).reverse().forEach(field => {
    if (this.GroupForm.get(field).invalid)
        errorField = document.getElementById(field);
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
    }
});


}


submit(input) {
    this.error = '';
    this.message = '';

    console.log(this.GroupForm.value);
    //  if (!this.GroupForm.valid) {
    //      console.log("Not valid!");
    //      this.validateAllFormFields(this.GroupForm);
    //      if (this.toast) this.toast.dismiss();
    //    this.toast = this.toastCtrl.create({
    //          message: 'Please fill all required fields.',
    //          duration: 3000
    //      });
    //      this.toast.present();
    //    return;
    //  }


    console.log(this.getData);
    if (this.getData) {

        this.groupopen.editGroups({ groupname: this.GroupForm.controls['groupname'].value, userids: this.userIds,GroupStatus:'Active'  },this.getData.id).then((data) => {
            console.log(data);
            this.navCtrl.setRoot('OpengroupPage');
        }).catch((err) => {
            console.log(err);
        })
    }

    else {

        this.groupopen.addgroups({ groupname: this.GroupForm.controls['groupname'].value, userids: this.userIds,GroupStatus:'Active' }).then((data) => {
            console.log(data);
            this.navCtrl.setRoot('OpengroupPage');

        }).catch((err) => {
            console.log(err)
        })
    }
}


addMember() {
    if(this.searchTerm){
        this.userIds.push(this.GroupForm.controls['members'].value);
        this.searchTerm='';
    }
  
  
}



gotoreset() {
    this.GroupForm.reset();
}



getUsers() {
    this.user.userList().then((data) => {
        console.log(data)
        this.users = data;
    })
}


add(item) {
      
    if(item){
        this.searchTerm= item.displayName +'-'+ item.employee+ '-'+ item.department
        this.searching=false;
    }
   
 
}

removeFocus() {
    this.keyboard.close();
    }


removePost(post){
              
    console.log("befpore"+this.userIds.length);
    for(var i=0; i<this.userIds.length;i++){
        if(this.userIds[i]==post){
            this.userIds.splice(i, 1);
        }
     
    }
    console.log("after"+this.userIds.length);
   
 }


 search() {
    this.searching = true;
    this.searchList= this.users.filter((item) => {
   return item.displayName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
   }); 
 }

 closemodal() {
    this.viewCtrl.dismiss();
    }
}