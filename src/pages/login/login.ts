import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { usercreds } from '../../models/interfaces/usercreds';
import {UserProvider} from '../../providers/user/user';
import { LinkususermasterPage } from '../linkususermaster/linkususermaster';
import { DashboardPage } from '../dashboard/dashboard';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})



export class LoginPage {

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;



  loginError: any;
  credentials = {} as usercreds;
  laoding: any;
  // public itemRef: firebase.database.Reference = firebase.database().ref('/users');
  // isActive:boolean=false;


  firedata = firebase.database().ref('/users');

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;


  private _DB: any;



  constructor(
     public af: AngularFireDatabase,
     public navCtrl: NavController, 
     public navParams: NavParams, 
     public viewCtrl: ViewController,
     public afireauth: AngularFireAuth,
     public authservice: AuthProvider,
      public formBuilder: FormBuilder,
      private user:UserProvider,
    ) {
      // if(this.user.isAuth){
      //   this.navCtrl.setRoot(LinkusdashboardPage)
      // }

      this._formGroup();

      this._DB = firebase.firestore();
    }




    ngOnInit() {
          
      }



       
        

    _formGroup() {
      let emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex), Validators.maxLength(50)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    
          });    
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
}

 

loginUser() {
    
  console.log("RAMAR"+ +JSON.stringify(this.credentials));
  if (!this.loginForm.valid) {
    console.log("Not valid!");
    alert('Please fill required fields');
    this.validateAllFormFields(this.loginForm);
    // if (this.toast) this.toast.dismiss();
    // this.toast = this.toastCtrl.create({
    //     message: 'Please fill all required fields.',
    //     duration: 3000
    // });
    // this.toast.present();
    return;
}


   this.afireauth.auth
   .signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
  
     .then(
       () => {
         this.user.isAuth=true;
         localStorage.setItem('login','true')
        this.navCtrl.setRoot('LinkususermasterPage');
       }
      
                
     ).catch((err)=>{
       console.log('test')
      //  this.isActive= true;
       alert('Invalid login');
     })
 
}


closemodal() {
  this.viewCtrl.dismiss();
}


gotoreset(){
  this.loginForm.reset();
}


}
 






    
