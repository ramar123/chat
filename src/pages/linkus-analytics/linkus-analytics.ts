import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AnalysticsProvider} from '../../providers/analytics/analytics'
import * as moment from 'moment';
import { ValueTransformer } from '@angular/compiler/src/util';


@IonicPage()
@Component({
  selector: 'page-linkus-analytics',
  templateUrl: 'linkus-analytics.html',
})
export class LinkusAnalyticsPage {


  noOfUser: any;
  noOfGroupList: any;
  noOfInactiveUser: any;
  noOfactUser: any;
 
  noOfOpenGroups: any;
  noOfTotalMessages: any;
  value: any;
  responseData: any;
  data;
  userdata = { "data": "" };

  yearwiseActiveUser: any;
  yearwiseTotalUser: any;
  yearwiseTotalGroupsList: any;
  yearwiseInactiveGroups: any;
  yearwiseOpenGroups: any;
  yearwiseTotalMessage: any;

  monthActiveUser: any;
  monthTotalUser: any;
  monthTotalGroupsList: any;
  monthInactiveGroups: any;
  monthOpenGroups: any;
  monthTotalMessage: any;

  todayArrayList = [];
  tdyUser: any;
  tdyactiveUser: any;
  tdyTotalGroupsList: any;
  tdyInactiveGroups: any;
  tdyOpenGroups: any;
  tdyTotalMessage: any;

  check = [];
  Finalvalue = [];
  yearwUserListarray = [];
  storevalues = [];
  storeActvalues = [];
  storeTotalMessages = [];
  storeTotalGroups = [];
  storeInactiveGroups = [];
  storeOpenGroups = [];

  monthArrayList = [];
  monthArrayList2 = [];
  monthstorevalues = [];
  monthstoreActvalues = [];
  monthstoreTotalMessages = [];
  monthstoreTotalGroups = [];
  monthstoreOpenGroups = [];


  constructor(public AnalysticsService: AnalysticsProvider, 
    public navCtrl: NavController,
    public viewCtrl: ViewController,
     public navParams: NavParams) {

  }


  search() {
    // const das = moment().format("YYYY-MM-DD");

    const date = new Date()


    if (this.data == "tillNow") {

      this.getUserList();
      this.getallGroups();
      this.getInactiveUser();
      this.getActiveUser();
      this.getOpenGroups();
      this.getTotalMessages();

    }
    else if (this.data == "year") {

      this.yearwUserList();
      this.yearwTotalGroups();
      this.yearwInactiveUser();
      this.yearwActiveUser();
      this.yearwOpenGroups();
      this.yearwTotalMessages();
    }
    else if (this.data == "month") {

      this.monthwUserList();
      this.monthwTotalGroups();
      this.monthwInactiveUser();
      this.monthwActiveUser();
      this.monthwOpenGroups();
      this.monthwTotalMessages();
    }
    else if (this.data == "today") {
      this.todayUserList();
      this.todayActiveUser();
      this.todayGroups();
      this.todayInactiveGroups();
      this.todayOpenGroups();
      this.todayTotalMessages();
    }

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkusAnalyticsPage');

    var dvalue = new Date();
    // console.log("xxxxx...." +dvalue.getFullYear+ - +dvalue.getMonth +-+);


    // this.getYearTotalMessages();

    //this.todayUserList();

  }


  getUserList() {
    this.AnalysticsService.getallusers().then((res: any) => {
      console.log("filteredusers :" + JSON.stringify(res))
      this.noOfUser = res.length;

    })
  }

  getallGroups() {
    this.AnalysticsService.getallGroups().then((res: any) => {
      console.log("getallGroups :" + JSON.stringify(res))
      this.noOfGroupList = res.length;

    })
  }

  getActiveUser() {
    this.AnalysticsService.getActiveUser().then((res: any) => {
      console.log("activeuser :" + JSON.stringify(res))
      this.noOfactUser = res.length;

    })
  }
  getInactiveUser() {
    this.AnalysticsService.getinactiveGroups().then((res: any) => {
      console.log("inactivegroups :" + JSON.stringify(res))
      this.noOfInactiveUser = res.length;

    })
  }

  getOpenGroups() {
    this.AnalysticsService.getOpengroup().then((res: any) => {
      console.log("opgrp :" + JSON.stringify(res))
      this.noOfOpenGroups = res.length;

    })
  }

  getTotalMessages() {
    this.AnalysticsService.getTotalmessages().then((res: any) => {
      ///  console.log("buddy :" + JSON.stringify(res))
      this.noOfTotalMessages = JSON.stringify(res);

    })

  }

  //Year

  yearwUserList() {

    this.AnalysticsService.getallusers().then((res: any) => {

      var Count = 1;
      this.yearwUserListarray = [];
      this.storevalues = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ.substring(0, 4);//.substring(0,4);
          this.yearwUserListarray.push(date);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {

          if (res[i].DOJ != undefined) {
            var getYear = res[i].DOJ.substring(0, 4);

            if (getYear == this.yearwUserListarray[j]) {

              countData++;
            }

          }

        }
        if (this.storevalues.length == 0) {
          this.storevalues.push({
            Year: this.yearwUserListarray[j],
            countData: countData
          })
        }
        else {
          this.storevalues.forEach(element => {

            if (element.Year != this.yearwUserListarray[j] && this.yearwUserListarray[j] != undefined && element.Year != undefined) {

              var index = this.getIndexIfObjWithOwnAttr(this.storevalues, 'Year', this.yearwUserListarray[j]);


              if (index == -1) {
                if (this.yearwUserListarray[j] != null && this.yearwUserListarray[j].length != 0) {
                  this.storevalues.push({

                    Year: this.yearwUserListarray[j],
                    countData: countData
                  })
                }
              }

            }

          });

        }

      }


    });

  }

  yearwTotalMessages() {
    this.AnalysticsService.getYearTotalmessages().then((res: any) => {

      var Count = 1;
      this.yearwUserListarray = [];
      this.storeTotalMessages = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].Filedate != undefined) {
          let date = res[i].Filedate.substring(10, 15);//.substring(0,4);

          this.yearwUserListarray.push(date);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        var c = 0;
        var arr = [];
        for (var i = 0; i < res.length; i++) {
          if (res[i].Filedate != undefined) {
            var getYear = res[i].Filedate.substring(10, 15);

            if (getYear == this.yearwUserListarray[j]) {

              countData++;

            }
          }

        }


        if (this.storeTotalMessages.length == 0) {
          this.storeTotalMessages.push({
            Year: this.yearwUserListarray[j],
            countData: countData
          })
        }
        else {
          this.storeTotalMessages.forEach(element => {

            if (element.Year != this.yearwUserListarray[j] && this.yearwUserListarray[j] != undefined) {

              var index = this.getIndexIfObjWithOwnAttr(this.storeTotalMessages, 'Year', this.yearwUserListarray[j]);

              if (index == -1) {
                this.storeTotalMessages.push({
                  Year: this.yearwUserListarray[j],
                  countData: countData
                })
              }
            }

          });

        }

      }


    });

  }
  yearwTotalGroups() {
    this.AnalysticsService.getallGroups().then((res: any) => {
    
      var Count = 1;
      this.yearwUserListarray = [];
      this.storeTotalGroups = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 4);//.substring(0,4);
          this.yearwUserListarray.push(date);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].date != undefined) {
            var getYear = res[i].date.substring(0, 4);

            if (getYear == this.yearwUserListarray[j]) {

              countData++;


            }

          }


        }

        if (this.storeTotalGroups.length == 0) {
          this.storeTotalGroups.push({
            Year: this.yearwUserListarray[j],
            countData: countData
          })
        }
        else {
          this.storeTotalGroups.forEach(element => {

            if (element.Year != this.yearwUserListarray[j] && this.yearwUserListarray[j] != undefined) {

              var index = this.getIndexIfObjWithOwnAttr(this.storeTotalGroups, 'Year', this.yearwUserListarray[j]);

              if (index == -1) {
                this.storeTotalGroups.push({
                  Year: this.yearwUserListarray[j],
                  countData: countData
                })
              }

            }

          });

        }

      }


    });


  }

  yearwInactiveUser() {
    this.AnalysticsService.getinactiveGroups().then((res: any) => {

      var Count = 1;
      this.yearwUserListarray = [];
      this.storeInactiveGroups = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 4);//.substring(0,4);
          this.yearwUserListarray.push(date);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].date != undefined) {
            var getYear = res[i].date.substring(0, 4);

            if (getYear == this.yearwUserListarray[j]) {

              countData++;


            }

          }


        }

        if (this.storeInactiveGroups.length == 0) {
          this.storeInactiveGroups.push({
            Year: this.yearwUserListarray[j],
            countData: countData
          })
        }
        else {
          this.storeInactiveGroups.forEach(element => {

            if (element.Year != this.yearwUserListarray[j] && this.yearwUserListarray[j] != undefined) {

              var index = this.getIndexIfObjWithOwnAttr(this.storeInactiveGroups, 'Year', this.yearwUserListarray[j]);

              if (index == -1) {
                this.storeInactiveGroups.push({
                  Year: this.yearwUserListarray[j],
                  countData: countData
                })
              }

            }

          });

        }

      }

    });

  }


  yearwActiveUser() {

    this.AnalysticsService.getActiveUser().then((res: any) => {

      var Count = 1;
      this.yearwUserListarray = [];
      this.storeActvalues = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ.substring(0, 4);//.substring(0,4);
          this.yearwUserListarray.push(date);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
            var getYear = res[i].DOJ.substring(0, 4);

            if (getYear == this.yearwUserListarray[j]) {

              countData++;



            }
          }
        }

        if (this.storeActvalues.length == 0) {
          this.storeActvalues.push({
            Year: this.yearwUserListarray[j],
            countData: countData
          })
        }
        else {
          this.storeActvalues.forEach(element => {

            if (element.Year != this.yearwUserListarray[j] && this.yearwUserListarray[j] != undefined) {

              var index = this.getIndexIfObjWithOwnAttr(this.storeActvalues, 'Year', this.yearwUserListarray[j]);


              if (index == -1) {
                if (this.yearwUserListarray[j] != null && this.yearwUserListarray[j].length != 0) {
                  this.storeActvalues.push({
                    Year: this.yearwUserListarray[j],
                    countData: countData
                  })
                }
              }
            }

          });

        }
      }
    });

  }

  yearwOpenGroups() {
    this.AnalysticsService.getOpengroup().then((res: any) => {
      var Count = 1;
      this.yearwUserListarray = [];
      this.storeOpenGroups = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 4);//.substring(0,4);
          this.yearwUserListarray.push(date);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].date != undefined) {
            var getYear = res[i].date.substring(0, 4);

            if (getYear == this.yearwUserListarray[j]) {

              countData++;

            }
          }
        }

        if (this.storeOpenGroups.length == 0) {
          this.storeOpenGroups.push({
            Year: this.yearwUserListarray[j],
            countData: countData
          })
        }
        else {
          this.storeOpenGroups.forEach(element => {

            if (element.Year != this.yearwUserListarray[j] && this.yearwUserListarray[j] != undefined) {

              var index = this.getIndexIfObjWithOwnAttr(this.storeOpenGroups, 'Year', this.yearwUserListarray[j]);


              if (index == -1) {
                this.storeOpenGroups.push({
                  Year: this.yearwUserListarray[j],
                  countData: countData
                })
              }

            }

          });

        }
      }
    });
  }


  monthwUserList() {
    this.AnalysticsService.getallusers().then((res: any) => {
      var Count = 1;
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthstorevalues = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ.substring(0, 4);//.substring(0,4);
          let month = res[i].DOJ.substring(5, 7);


          this.monthArrayList.push(date);
          this.monthArrayList2.push(month);
        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
            var getYear = res[i].DOJ.substring(0, 4);
            var getMonth = res[i].DOJ.substring(5, 7);

            if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {
              countData++;

            }
          }
        }
      
        if (this.monthstorevalues.length == 0) {
          this.monthstorevalues.push({
            Year: this.monthArrayList[j],
            Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
            countData: countData
          })
        }
        else {

          var Checkflag=false;
          this.monthstorevalues.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag=true;

              }
            }
          })

          if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid")
          { 

            this.monthstorevalues.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })

          }
        }
      }
    });
  }

  monthwTotalGroups() {

    this.AnalysticsService.getallGroups().then((res: any) => {

      var Count = 1;
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthTotalGroupsList = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 4);//.substring(0,4);
          let month = res[i].date.substring(5, 7);

          this.monthArrayList.push(date);
          this.monthArrayList2.push(month);
        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].date != undefined) {
            var getYear = res[i].date.substring(0, 4);
            var getMonth = res[i].date.substring(5, 7);

            if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {

              countData++;

            }
          }
        }

        if (this.monthTotalGroupsList.length == 0) {
          this.monthTotalGroupsList.push({
            Year: this.monthArrayList[j],
            Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
            countData: countData
          })
        }
        else {

          var Checkflag=false;
          this.monthTotalGroupsList.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM');
            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag=true;
              
              }
            }
          })

          if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid")
          {  
            this.monthTotalGroupsList.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })
          }
        }
      }
    });

  }
  monthwInactiveUser() {
    this.AnalysticsService.getinactiveGroups().then((res: any) => {

      var Count = 1;
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthInactiveGroups = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 4);//.substring(0,4);
          let month = res[i].date.substring(5, 7);

          this.monthArrayList.push(date);
          this.monthArrayList2.push(month);
        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].date != undefined) {
            var getYear = res[i].date.substring(0, 4);
            var getMonth = res[i].date.substring(5, 7);

            if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {

              countData++;

            }
          }
        }

        if (this.monthInactiveGroups.length == 0) {
          this.monthInactiveGroups.push({
            Year: this.monthArrayList[j],
            Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
            countData: countData
          })
        }
        else { 

          var Checkflag=false;
          this.monthInactiveGroups.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag=true;

              }
            }
          })

          if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid")
          {  
            this.monthInactiveGroups.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })
          }
        }
      }
    });
  }




  monthwActiveUser() {
    this.AnalysticsService.getActiveUser().then((res: any) => {

      var Count = 1;
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthstoreActvalues = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ.substring(0, 4);//.substring(0,4);
          let month = res[i].DOJ.substring(5, 7);
          this.monthArrayList.push(date);
          this.monthArrayList2.push(month);
        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
            var getYear = res[i].DOJ.substring(0, 4);
            var getMonth = res[i].DOJ.substring(5, 7);


            if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {

              countData++;

            }
          }
        }

        if (this.monthstoreActvalues.length == 0) {
          this.monthstoreActvalues.push({
            Year: this.monthArrayList[j],
            Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
            countData: countData
          })
        }
        else {

          var Checkflag=false;
          this.monthstoreActvalues.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag=true;

              }
            }
          })

          if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid")
          {  
            this.monthstoreActvalues.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })
          }
        }
      }
    });
  }




 














  monthwOpenGroups() {

    this.AnalysticsService.getOpengroup().then((res: any) => {

      var Count = 1;
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthOpenGroups = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 4);//.substring(0,4);
          let month = res[i].date.substring(5, 7);

          this.monthArrayList.push(date);
          this.monthArrayList2.push(month);
        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].date != undefined) {
            var getYear = res[i].date.substring(0, 4);
            var getMonth = res[i].date.substring(5, 7);

            if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {

              countData++;

            }
          }
        }

        if (this.monthOpenGroups.length == 0) {
          this.monthOpenGroups.push({
            Year: this.monthArrayList[j],
            Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
            countData: countData
          })
        }
        else {

          var Checkflag=false;
          this.monthOpenGroups.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag=true;
              }
            }
          })

          if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid")
          {  
            this.monthOpenGroups.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })
          }
        }
      }
    });

  }

  monthwTotalMessages() {
    this.AnalysticsService.getYearTotalmessages().then((res: any) => {

      var Count = 1;
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthTotalMessage = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].Filedate != undefined) {
          let date = res[i].Filedate.substring(10, 15);//.substring(0,4);
          let month = res[i].Filedate.substring(4, 7);

          this.monthArrayList.push(date);
          this.monthArrayList2.push(month);

        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {

          if (res[i].Filedate != undefined) {
            var getYear = res[i].Filedate.substring(10, 15);
            var getMonth = res[i].Filedate.substring(4, 7);

            if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {

              countData++;

            }
          }
        }

        if (this.monthTotalMessage.length == 0) {
          this.monthTotalMessage.push({
            Year: this.monthArrayList[j],
            Month: moment(this.monthArrayList2[j], 'MMM').format('MMMM'),
            countData: countData
          })
        }
        else {
          var checkInvalid = this.monthTotalMessage.forEach(element => {});
          var Checkflag=false;
          this.monthTotalMessage.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined && element.Year != "Invalid date" && element.Month != "Invalid date") {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag=true;

              }
            }
          })
         
          if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid date" && this.monthTotalMessage.Year != undefined && this.monthTotalMessage.Month != undefined)
          {  

            this.monthTotalMessage.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })

          }
        }
      }
    });
  }


  //today


  todayUserList() {
    this.AnalysticsService.getallusers().then((res: any) => {
      this.todayArrayList = [];

      var dvalue = this.convertDate(new Date());
      
      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {

          let date = res[i].DOJ.substring(0, 10);//.substring(0,4);
          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {
      
        if (this.todayArrayList[i] == dvalue) {
          Count++;
      
        }
      }
      this.tdyUser = Count;

      })
  }


  

  todayActiveUser() {
    this.AnalysticsService.getActiveUser().then((res: any) => {
      this.todayArrayList = [];

      var dvalue = this.convertDate(new Date());

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ.substring(0, 10);//.substring(0,4);

          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {

        if (this.todayArrayList[i] == dvalue) {
          Count++;

        }
      }
      this.tdyactiveUser = Count;

    })
  }


  todayGroups() {
    this.AnalysticsService.getallGroups().then((res: any) => {

      this.todayArrayList = [];

      var dvalue = this.convertDate(new Date());

      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 10);//.substring(0,4);

          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {

       if (this.todayArrayList[i] == dvalue) {
          Count++;

        }

      }
      this.tdyTotalGroupsList = Count;
    })


  }
  todayInactiveGroups() {
    this.AnalysticsService.getinactiveGroups().then((res: any) => {

      this.todayArrayList = [];

      var dvalue = this.convertDate(new Date());
      for (var i = 0; i < res.length; i++) {
        if (res[i].date != undefined) {
          let date = res[i].date.substring(0, 10);//.substring(0,4);

          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {

        if (this.todayArrayList[i] == dvalue) {
          Count++;

        }
      }
      this.tdyInactiveGroups = Count;
    })
  }
  todayOpenGroups() {
    this.AnalysticsService.getOpengroup().then((res: any) => {
      this.todayArrayList = [];

      var dvalue = this.convertDate(new Date());
      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ.substring(0, 10);//.substring(0,4);

          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {



        if (this.todayArrayList[i] == dvalue) {
          Count++;

        }
      }
      this.tdyOpenGroups = Count;
    })
  }

  todayTotalMessages() {
    this.AnalysticsService.getYearTotalmessages().then((res: any) => {

      var currdate = new Date();
      var dvalue = currdate.toString().substring(4, 15); //Feb 22 2019
      for (var i = 0; i < res.length; i++) {
        if (res[i].Filedate != undefined) {
          let date = res[i].Filedate.substring(4, 15);//.substring(0,4);

          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {


        if (this.todayArrayList[i] == dvalue) {
          Count++;

        }
      }
      this.tdyTotalMessage = Count;
    })
  }




  getIndexIfObjWithOwnAttr = function (array, attr, value) {

    var initial_array = [];
    for (var i = 0; i < array.length; i++) {

      if (array[i][attr] == value) {
        initial_array.push(i);
        return i;

      }
    }
    if (initial_array.length > 0) {
      return initial_array;

    } else {
      return -1;

    }
  }


  convertDate(date) {
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'agu', 'sep', 'oct', 'nov', 'dec'];
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return year + "-" + "0" + month + "-" + day;
  }


  closemodal() {
    this.viewCtrl.dismiss();
}



}