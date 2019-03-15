
import { Component, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { LinkususermasterPage } from '../linkususermaster/linkususermaster';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase';
import { googlemaps } from 'googlemaps';


@IonicPage()
@Component({
    selector: 'page-linkusaddusermaster',
    templateUrl: 'linkusaddusermaster.html',
})


export class LinkusaddusermasterPage {
    language1: any;
    gender1: any;
    designation1: any;
    department1: any;
    branchname1: any;
    contacttype1: '';


    autocompleteItems: any;
    autocomplete: any;
    acService: any;
    placesService: any;


    sendata: any;
    toast: any;
    message: string;
    error: string;
    data: any;
    register: any;



    private userForm: FormGroup;

    employee: FormControl;
    displayName: FormControl;
    email: FormControl;
    extension: FormControl;
    mobilenumber: FormControl;
    password: FormControl;
    contacttype: FormControl;
    branchname: FormControl;
    department: FormControl;
    designation: FormControl;
    DOB: FormControl;
    DOJ: FormControl;
    gender: FormControl;
    landline: FormControl;
    language: FormControl;
    location: FormControl;
    mobilelogin: FormControl;
    weblogin: FormControl;
    deviceres: FormControl;
    created_at: FormControl;
    extension1:''
    getData: any ;
    public addrKeys: string[];
    public addr: object;
    private userList: any = [];

    isMobile = false;
    isemp = false;
    isemail = false;


    constructor(public navCtrl: NavController,
        public viewCtrl: ViewController,
        private fb: FormBuilder,
        private loadingCtrl: LoadingController,
        private user: UserProvider,
        private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private zone: NgZone,
        public navParams: NavParams) {
        this.getData = this.navParams.get('userpass')
        console.log(this.getData);
        this._formGroup();
    }


    ngOnInit() {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };

        this.user.userList().then((user: any) => {

            this.userList = user;

        })
    }



    updateSearch() {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let self = this;
        let config = {
            input: this.autocomplete.query,
            componentRestrictions: {}
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            console.log(predictions);
            if (predictions) {
                predictions.forEach(function (prediction) {
                    self.autocompleteItems.push(prediction);
                });
            }

        });
    }


    chooseItem(value) {
        console.log(value);
        this.autocomplete.query = value.description;
        this.userForm.controls['location'].setValue(value.description);
        this.autocompleteItems = [];

    }

    _formGroup() {
        let emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";


        this.userForm = this.fb.group({


            'employee': ['', Validators.compose([Validators.required])],
            'displayName': ['', Validators.compose([Validators.required])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex), Validators.maxLength(50)])],
            'extension': [''],
            'mobilenumber': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            'password': ['', Validators.compose([Validators.required])],
            'contacttype': [''],
            'branchname': [''],
            'department': [''],
            'designation': [''],
            'DOB': [''],
            'DOJ': [''],
            'gender': [''],
            'landline': [''],
            'language': [''],
            'location': [''],
            'mobilelogin': ['1', Validators.compose([Validators.required])],
            'weblogin': ['1', Validators.compose([Validators.required])],
            'deviceres': ['0', Validators.compose([Validators.required])],
            'created_at': [''],


        });

        if (this.getData) {
            console.log(this.getData);
            this.extension1=this.getData.extension;
            this.contacttype1=this.getData.contacttype;
            this.branchname1=this.getData.branchname;
            this.department1=this.getData.department;
            this.designation1=this.getData.designation;
            this.gender1=this.getData.gender;
            this.language1=this.getData.language;



            this.userForm.controls['employee'].setValue(this.getData.employee);
            this.userForm.controls['displayName'].setValue(this.getData.displayName);
            this.userForm.controls['email'].setValue(this.getData.email);
            this.userForm.controls['extension'].setValue(this.getData.extension);
            this.userForm.controls['mobilenumber'].setValue(this.getData.mobilenumber);
            this.userForm.controls['password'].setValue(this.getData.password);
            this.userForm.controls['contacttype'].setValue(this.getData.contacttype);
            this.userForm.controls['branchname'].setValue(this.getData.branchname);
            this.userForm.controls['department'].setValue(this.getData.department);
            this.userForm.controls['designation'].setValue(this.getData.designation);
            this.userForm.controls['DOB'].setValue(this.getData.DOB);
            this.userForm.controls['DOJ'].setValue(this.getData.DOJ);
            this.userForm.controls['gender'].setValue(this.getData.gender);
            this.userForm.controls['landline'].setValue(this.getData.landline);
            this.userForm.controls['language'].setValue(this.getData.language);
            this.userForm.controls['location'].setValue(this.getData.location);
            this.userForm.controls['mobilelogin'].setValue(this.getData.mobilelogin);
            this.userForm.controls['weblogin'].setValue(this.getData.weblogin);
            this.userForm.controls['deviceres'].setValue(this.getData.deviceres);
            this.userForm.controls['created_at'].setValue(this.getData.deviceres);
        }


    }

    setAddress(addrObj) {

        this.zone.run(() => {
            this.addr = addrObj;
            this.addrKeys = Object.keys(addrObj);
            console.log(this.addrKeys);
        });
    }


    validateAllFormFields(formGroup: FormGroup) {
        let errorField: any;
        Object.keys(formGroup.controls).reverse().forEach(field => {
            if (this.userForm.get(field).invalid)
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

        if (!this.userForm.valid) {
            console.log("Not valid!");
            this.validateAllFormFields(this.userForm);
            // alert('Please fill all required fields');


            //   if (this.toast) this.toast.dismiss();
            //   this.toast = this.toastCtrl.create({
            //       message: 'Please fill all required fields.',
            //       duration: 3000,
            //       position:'Top'
            //   });
            //   this.toast.present();
            return;
        }
        console.log(this.userList);
        console.log(this.userForm.controls['employee'].value);
        this.isMobile = false;
        this.isemp = false;
        this.isemail = false;
        for (let i = 0; i < this.userList.length; i++) {

            if (this.userList[i].employee === this.userForm.controls['employee'].value) {

                console.log(this.userForm.controls.employee)
                console.log(this.userList[i].employee);
                this.isemp = true;
                // alert('employee code already exists');

                break;
                // return;

            } 


            //  if (this.userList[i].email === this.userForm.controls['email'].value) {

              
            //     this.isemail = true;
            //     // alert('employee code already exists');

            //     break;
            //     

            // }





             if (this.userList[i].mobilenumber === this.userForm.controls['mobilenumber'].value) {

                this.isMobile = true;
                // alert('mobile already exists');

                break;
                // return;
            }

            if (i === this.userList.length - 1) {
                if(!this.isemp && !this.isemail && !this.isMobile){
                    this.addUser();
                }
               
            }

       }


    }

    addUser() {

        if (this.getData) {
            this.user.editUser(this.userForm.value, this.getData.id).then((data) => {
                console.log(data);
                this.navCtrl.setRoot(LinkususermasterPage);
            }).catch((err) => {
                console.log(err)
            })
        } else {


            this.user.LoginAuthentication(this.userForm.controls.email, this.userForm.controls.employee, this.userForm.controls.mobilenumber).then((res: any) => {

                this.user.adduser(this.userForm.value).then((data) => {
                    console.log(data);
                    let toast = this.toastCtrl.create({
                        message: 'User Updated successfully',
                        duration: 3000,
                        position: 'middle',
                    });
                    toast.present();
                    this.navCtrl.setRoot(LinkususermasterPage);

                }).catch((err) => {
                    console.log(err)
                    if(err.code === 'auth/email-already-in-use'){
                        this.isemail = true;
                    } else {
                        alert(err.message);
                    }
                   
                })

            });


        }


       
    }

    gotoreset() {
        this.userForm.reset();
    }


    closemodal() {
        this.viewCtrl.dismiss();
    }



}



