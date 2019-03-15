import { Component, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AnalysticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';
import * as moment from 'moment';
import { empty, from } from 'rxjs';
import { convertUrlToSegments } from 'ionic-angular/umd/navigation/url-serializer';


@IonicPage()
@Component({
  selector: 'page-usertrending',
  templateUrl: 'usertrending.html',
})


export class UsertrendingPage {
  tdyinactiveUser: number;

  examplearry = [];
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

  filteredyearArray = [];
  filteredActyearArray = [];
  filteredInactyearArray = [];



  monthArrayList = [];
  monthArrayList2 = [];
  monthstorevalues = [];
  monthstoreActvalues = [];
  monthstoreTotalMessages = [];
  monthstoreTotalGroups = [];
  monthstoreOpenGroups = [];

  filteredMonthUsers = [];
  filteredMonthActiveUsers = [];
  filteredMonthInactUsers = [];


  userSendmsgs: any = [];
  userReceivemsgs: any = [];
  userGroupMessage: any = [];
  yearGroupMessage: any = [];
  monthGroupMessage: any = [];
  todayGroupMessage: any = [];
  isSearch: boolean = false;

  keyvalue = [];
  messageBoard = [];
  groupName = [];
  groupmessagesArray = [];

  constructor(public AnalysticsService: AnalysticsProvider,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private userProvider: UserProvider,
    public navParams: NavParams) {

  
    // this.getYearSentMsgs();
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
      this.getGroupMessages();
      this.getSentMsgs();
      this.getReceiveMsgs();


    }
    else if (this.data == "year") {

      this.yearwUserList();
      this.yearwTotalGroups();
      this.yearwInactiveUser();
      this.yearwActiveUser();
      this.yearwOpenGroups();
      this.yearwTotalMessages();
      this.getYearGroupMessages();
      this.getSentMsgs();
      this.getReceiveMsgs();

    }
    else if (this.data == "month") {

      this.monthwUserList();
      this.monthwTotalGroups();
      this.monthwInactiveUser();
      this.monthwActiveUser();
      this.monthwOpenGroups();
      this.monthwTotalMessages();
      this.getMonthGroupMessages();
      this.getSentMsgs();
      this.getReceiveMsgs();
    }
    else if (this.data == "today") {

      this.todayUserList();
      this.todayActiveUser();
      this.todayInActiveUser();
      this.todayTotalMessages();
      this.todayGroupMessages();
      this.getSentMsgs();
      this.getReceiveMsgs();
    }

    this.isSearch = true;

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
    this.AnalysticsService.getRemovedUser().then((res: any) => {
      console.log("inactivegroups :" + JSON.stringify(res))
      this.noOfInactiveUser = res.length;

    })
  }


  getOpenGroups() {
    this.AnalysticsService.getOpengroup().then((res: any) => {
      console.log("opgrp :" + res.length)
      this.noOfOpenGroups = res.length;

    })
  }


  getTotalMessages() {
    this.AnalysticsService.getTotalmessages().then((res: any) => {
      ///  console.log("buddy :" + JSON.stringify(res))
      this.noOfTotalMessages = JSON.stringify(res);

    })

  }

    // Top 10 Group Messages


  getGroupMessages() {
    this.AnalysticsService.getallGroupmessages().then((res: any) => {
      console.log("buddygroupmessages :" + JSON.stringify(res))
      var k = 0;
      this.keyvalue = [];
      this.messageBoard = [];
      this.groupmessagesArray = [];
      this.groupName = [];


      var mainGroupArray = [];
      var dataArray = [];
      res.forEach(element => {

        element.forEach(element1 => {
          var count = 0, i = 0;

          element1.forEach(element2 => {

            if (element1.val().owner == element.key) {
              if (element2.key == 'msgboard') {
                console.log("entered   2:")
                var exam = {
                  key: element.key,
                  groupName: element1.key,
                  data: element2
                }
                mainGroupArray.push(exam)
              }
            }

          })

        });
        console.log("mainGroupArray :" + JSON.stringify(mainGroupArray) + "=====" + mainGroupArray.length)

      });

      for (var j = 0; j < mainGroupArray.length; j++) {


        var countData = 0;
        dataArray = [];

        if (mainGroupArray[j].data != "" && mainGroupArray[j].data.val().length != 0) {
          dataArray.push(mainGroupArray[j].data);

          for (var i = 0; i < dataArray.length; i++) {
            dataArray.forEach(element5 => {

              element5.forEach(element6 => {

                countData++;
              });
            });

          }

        }
        console.log("datacount :" + countData)

        if (countData != 0) {
          this.groupName.push({
            Name: mainGroupArray[j].groupName,
            count: countData
          })

        }
        this.userGroupMessage = this.groupName.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
        console.log("abcdef" + JSON.stringify(this.userGroupMessage))

      }
      console.log("finally got it :" + JSON.stringify(this.groupName))

    })

  }


  getYearGroupMessages() {
    this.AnalysticsService.getallGroupmessages().then((res: any) => {
      console.log("buddygroupmessages :" + JSON.stringify(res))
      var k = 0, todate, toyear;
      this.keyvalue = [];
      this.groupName = [];




      var mainGroupArray = [];
      var yearArray = [];
      res.forEach(element => {

        element.forEach(element1 => {

          element1.forEach(element2 => {

            if (element1.val().owner == element.key) {

              console.log("owner")

              if (element2.key == 'msgboard') {
                console.log("messageboard")
                if(element2 != ""){


                  element2.forEach(arrayelement => {
                    console.log("enteered 3 :" +arrayelement.val().Filedate)
                   var msgdate = arrayelement.val().Filedate;
                     if (msgdate != undefined) {
                    
                        var mydate = new Date(msgdate);
                        var myyear = mydate.getFullYear();
                        yearArray.push(myyear)
                     }
                     console.log("enteered 3 :" +arrayelement.val().Filedate +"year   :" +myyear  +";;;;;;;;;" ) 
                  })

                 
                

                  element2.forEach(element3 => {

                   
                    todate = element3.val().Filedate;
                     if (todate != undefined) {
                    
                        var mydate = new Date(todate);
                        toyear = mydate.getFullYear();
                        var count = 0;

                        for(var i=0; i<yearArray.length; i++){
                          if(toyear ==yearArray[i]) {
                            count++;
                          }
                        }

                        if(mainGroupArray.length ==0 && count !=0) {
                          mainGroupArray.push({
                            groupName: element1.key,
                            year : toyear,
                            count: count
                          })
                         
                          console.log("mainGroupArray.length 1:"+mainGroupArray.length)

                        }
        
                        else{
                          console.log("mainGroupArray.length 2:"+mainGroupArray.length)

                          var Checkflag = false;
                          mainGroupArray.forEach(element4 => {
        
                            if ( element1.key != undefined ) {
        
                              console.log("======== :"+element4.year+"="+toyear+" :: "+element4.groupName +"="+element1.key)
                              if (element4.year == toyear && element4.groupName == element1.key) {
                                Checkflag = true;
        
                              }
                            }
                          })
                          if (!Checkflag &&  element1.key != undefined) {

                            mainGroupArray.push({
                              groupName: element1.key,
                              year : toyear,
                              count: count
                            })
                          }

                          console.log("mainGroupArray.length 3:"+mainGroupArray.length)

                        }


                       
                     }       
                    
                  });

                  console.log("mmmmmmmmmm" +JSON.stringify(yearArray))

                }
               
              }
            }

          })

        });

      

      });

  
     
      this.yearGroupMessage = mainGroupArray.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
      console.log("yearabcdef" + JSON.stringify(this.yearGroupMessage))

      console.log("mainGroupArray :" + JSON.stringify(mainGroupArray) + "=====" + mainGroupArray.length)
    })

  }


  getMonthGroupMessages() {
   this.AnalysticsService.getallGroupmessages().then((res: any) => {
      console.log("buddygroupmessages :" + JSON.stringify(res))
      var k = 0, todate, toyear,tomonth;
      this.keyvalue = [];
      this.groupName = [];




      var mainGroupArray = [];
      var yearArray = [];
      var monthArray = [];
      res.forEach(element => {

        element.forEach(element1 => {

          element1.forEach(element2 => {

            if (element1.val().owner == element.key) {

              if (element2.key == 'msgboard') {

                if(element2 != ""){


                  element2.forEach(arrayelement => {
                    console.log("enteered 3 :" +arrayelement.val().Filedate)
                   var msgdate = arrayelement.val().Filedate;
                     if (msgdate != undefined) {
                    
                        var mydate = new Date(msgdate);
                        var myyear = mydate.getFullYear();
                        var mymonth = ("0" + (mydate.getMonth() + 1)).slice(-2);
                        yearArray.push({
                          year : myyear,
                          month :mymonth
                        })
                        
                     }
                     console.log("enteeeeeeeeeered :" +JSON.stringify(yearArray))  
                  })

                 
                

                  element2.forEach(element3 => {

                   
                    todate = element3.val().Filedate;
                     if (todate != undefined) {
                    
                        var mydate = new Date(todate);
                        toyear = mydate.getFullYear();
                        tomonth = ("0" + (mydate.getMonth() + 1)).slice(-2);
                        var count = 0;

                        for(var i=0; i<yearArray.length; i++){
                          if(toyear ==yearArray[i].year && tomonth == yearArray[i].month) {
                            count++;
                          }
                        }

                        if(mainGroupArray.length ==0 && count !=0) {
                          mainGroupArray.push({
                            year : toyear,
                            month : tomonth,
                            groupName: element1.key,
                            count: count
                          })
                         
                          console.log("mainGroupArray.length 1:"+mainGroupArray.length)

                        }
        
                        else{
                          console.log("mainGroupArray.length 2:"+mainGroupArray.length)

                          var Checkflag = false;
                          mainGroupArray.forEach(element4 => {
        
                            if ( element1.key != undefined ) {
        
                              console.log("======== :"+element4.year+"="+toyear+" :: "+element4.groupName +"="+element1.key)
                              if (element4.year == toyear && element4.month == tomonth && element4.groupName == element1.key) {
                                Checkflag = true;
        
                              }
                            }
                          })
                          if (!Checkflag &&  element1.key != undefined) {

                            mainGroupArray.push({
                              year : toyear,
                              month : tomonth,
                              groupName: element1.key,
                              count: count
                            })
                          }

                        }


                       
                     }       
                    
                  });
                  
                  console.log("mmmmmmmmmm" +JSON.stringify(yearArray))

                }
               
              }
            }

          })

        });

      

      });

  
     
      this.monthGroupMessage = mainGroupArray.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
      console.log("monthabcdef" + JSON.stringify(this.monthGroupMessage))

      console.log("yearmainGroupArray :" + JSON.stringify(mainGroupArray) + "=====" + mainGroupArray.length)
    })

  }


  todayGroupMessages() {
    this.AnalysticsService.getallGroupmessages().then((res: any) => {
      console.log("buddygroupmessages :" + JSON.stringify(res))
      var k = 0, todate, toyear,tomonth;
      this.keyvalue = [];
      this.groupName = [];

      //current date...
      var dvalue = this.convertDate(new Date());


      var mainGroupArray = [];
      var yearArray = [];
      var monthArray = [];
      res.forEach(element => {

        element.forEach(element1 => {

          element1.forEach(element2 => {

            if (element1.val().owner == element.key) {

              if (element2.key == 'msgboard') {

                if(element2 != ""){


                  element2.forEach(arrayelement => {
                    console.log("enteered 3 :" +arrayelement.val().Filedate)
                   var msgdate = arrayelement.val().Filedate;
                     if (msgdate != undefined) {
                    
                      var mydate = new Date(msgdate);

                      var mnth = ("0" + (mydate.getMonth() + 1)).slice(-2);
                      var day = ("0" + mydate.getDate()).slice(-2);
                      var finaldate = mydate.getFullYear() + "-" + mnth + "-" + day;
    
                      // year = fulldate.getFullYear;
    
                      console.log("FileDateee" + msgdate + "sssssssss" + mydate)
                        yearArray.push(finaldate);
                        
                     }
                     console.log("enteeeeeeeeeered :" +JSON.stringify(yearArray))  
                  })

                 
                

                  element2.forEach(element3 => {

                   
                    todate = element3.val().Filedate;
                     if (todate != undefined) {
                    
                        var mydate = new Date(todate);
                        var mnth = ("0" + (mydate.getMonth() + 1)).slice(-2);
                      var day = ("0" + mydate.getDate()).slice(-2);
                      var finaldate = mydate.getFullYear() + "-" + mnth + "-" + day;
                      var count =0;

                        for(var i=0; i<yearArray.length; i++){
                          if(finaldate ==yearArray[i]) {
                            count++;
                          }
                        }

                        if( mainGroupArray.length == 0 &&count !=0) {
                          mainGroupArray.push({
                            groupName: element1.key,
                            count: count
                          })
                         
                          console.log("mainGroupArray.length 1:"+mainGroupArray.length)

                        }
                        else 
                        {
        
                        mainGroupArray.forEach(element4 => {

                      
              
                            var index = this.getIndexIfObjWithOwnAttr(mainGroupArray, 'groupName', element1.key);
              
              
                            if (index == -1) {
                                mainGroupArray.push({
                                  groupName: element1.key,
                                  count: count
                                })
                              
                            }
              
                          
              
                        });
              
                      }


                       
                     }       
                    
                  });
                  
                  console.log("mmmmmmmmmm" +JSON.stringify(yearArray))

                }
               
              }
            }

          })

        });

      

      });

  
     
      this.todayGroupMessage = mainGroupArray.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
      console.log("todayabcdef" + JSON.stringify(this.monthGroupMessage))

      console.log("todayGroupArray :" + JSON.stringify(mainGroupArray) + "=====" + mainGroupArray.length)
    })

  }


  //Year

  yearwUserList() {

    this.AnalysticsService.getallusers().then((res: any) => {

      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();

      var Count = 1;
      this.yearwUserListarray = [];
      this.storevalues = [];
      this.filteredyearArray = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined && res[i].DOJ != "") {
          var date = res[i].DOJ;
          var splitdate = date.split('/');
          var year = splitdate[2];

          this.yearwUserListarray.push(year);
        }
        
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {

          if (res[i].DOJ != undefined) {
            var date = res[i].DOJ;
            var splitdate = date.split('/');
            var getYear = splitdate[2];

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

      for (var a=0 ; a<3; a++) {
        currentyear =  currentyear;
        
        
         for(var k=0; k<this.storevalues.length; k++) {

           if(this.storevalues[k].Year == currentyear){
            this.filteredyearArray.push({

              Year: this.storevalues[k].Year,
              countData: this.storevalues[k].countData
            })
           }
         }
        currentyear--;
    }
    console.log("filtereduserlist" + JSON.stringify(this.filteredyearArray))


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
    this.AnalysticsService.getRemovedUser().then((res: any) => {

      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();

      var Count = 1;
      this.yearwUserListarray = [];
      this.storeInactiveGroups = [];


      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined && res[i].DOJ != "") {
          var date = res[i].DOJ;
          var splitdate = date.split('/');
          var year = splitdate[2];
          this.yearwUserListarray.push(year);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
            var date = res[i].DOJ;
            var splitdate = date.split('/');
            var getYear = splitdate[2];

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
                if (this.yearwUserListarray[j] != null && this.yearwUserListarray[j].length != 0) {
                  this.storeInactiveGroups.push({
                    Year: this.yearwUserListarray[j],
                    countData: countData
                  })
                }
              }
            }

          });

        }
      }

      for (var a=0 ; a<3; a++) {
        currentyear =  currentyear;
        
        
         for(var k=0; k<this.storeInactiveGroups.length; k++) {

           if(this.storeInactiveGroups[k].Year == currentyear){
            this.filteredActyearArray.push({

              Year: this.storeInactiveGroups[k].Year,
              countData: this.storeInactiveGroups[k].countData
            })
           }
         }
        currentyear--;
    }
    console.log("filtereduserlist" + JSON.stringify(this.filteredActyearArray))

    });


  }




  yearwActiveUser() {

    this.AnalysticsService.getActiveUser().then((res: any) => {

      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();

      var Count = 1;
      this.yearwUserListarray = [];
      this.storeActvalues = [];


      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined && res[i].DOJ != "") {
          var date = res[i].DOJ;
          var splitdate = date.split('/');
          var year = splitdate[2];
          this.yearwUserListarray.push(year);
        }
      }

      for (var j = 0; j <= this.yearwUserListarray.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
            var date = res[i].DOJ;
            var splitdate = date.split('/');
            var getYear = splitdate[2];

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

      for (var a=0 ; a<3; a++) {
        currentyear =  currentyear;
        
        
         for(var k=0; k<this.storeActvalues.length; k++) {

           if(this.storeActvalues[k].Year == currentyear){
            this.filteredInactyearArray.push({

              Year: this.storeActvalues[k].Year,
              countData: this.storeActvalues[k].countData
            })
           }
         }
        currentyear--;
    }
    console.log("filtereduserlist" + JSON.stringify(this.filteredInactyearArray))

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

      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();
    
      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthstorevalues = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined && res[i].DOJ != "") {
          var date = res[i].DOJ;
          var splitdate = date.split('/');
          var year = splitdate[2];
          var month =('0' +splitdate[1]).slice(-2);


          this.monthArrayList.push(year);
          this.monthArrayList2.push(month);
        }
      
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
              var date = res[i].DOJ;
              var splitdate = date.split('/');
              var getYear = splitdate[2];
              var getMonth = splitdate[1];

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

          var Checkflag = false;
          this.monthstorevalues.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag = true;

              }
            }
          })

          if (!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid") {

            this.monthstorevalues.push({
              Year: this.monthArrayList[j],
               Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })

          }
        }
      }
        
        
         for(var k=0; k<this.monthstorevalues.length; k++) {

           if(this.monthstorevalues[k].Year == currentyear){
            this.filteredMonthUsers.push({

              Year: this.monthstorevalues[k].Year,
              Month: this.monthstorevalues[k].Month,
              countData: this.monthstorevalues[k].countData
            })
           }
         }
         console.log("currentyearmonth :" +JSON.stringify(this.filteredMonthUsers))

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

          var Checkflag = false;
          this.monthTotalGroupsList.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM');
            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag = true;

              }
            }
          })

          if (!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid") {
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
         this.AnalysticsService.getRemovedUser().then((res: any) => {
  
        var currentdate = new Date();
        var currentyear = currentdate.getFullYear();
  
        this.monthArrayList = [];
        this.monthArrayList2 = [];
        this.monthInactiveGroups = [];
  
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined && res[i].DOJ != "") {
            var date = res[i].DOJ;
            var splitdate = date.split('/');
            var year = splitdate[2];
            var month =('0' +splitdate[1]).slice(-2);
  
            this.monthArrayList.push(year);
            this.monthArrayList2.push(month);
          }
        }
  
        for (var j = 0; j <= this.monthArrayList.length; j++) {
  
          var countData = 0;
          for (var i = 0; i < res.length; i++) {
            if (res[i].DOJ != undefined) {
              var date = res[i].DOJ;
              var splitdate = date.split('/');
              var getYear = splitdate[2];
              var getMonth =splitdate[1];
  
  
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
  
            var Checkflag = false;
            this.monthInactiveGroups.forEach(element => {
  
              var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')
  
              if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {
  
                if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                  Checkflag = true;
  
                }
              }
            })
  
            if (!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid") {
              this.monthInactiveGroups.push({
                Year: this.monthArrayList[j],
                Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
                countData: countData
              })
            }
          }
        }
  
        console.log("asdfghjk" +JSON.stringify(this.monthInactiveGroups))
        for(var k=0; k<this.monthInactiveGroups.length; k++) {
  
          if(this.monthInactiveGroups[k].Year == currentyear){
           this.filteredInactyearArray.push({
  
             Year: this.monthInactiveGroups[k].Year,
             Month: this.monthInactiveGroups[k].Month,
             countData: this.monthInactiveGroups[k].countData
           })
          }
        }
        console.log("currentythinnn :" +JSON.stringify(this.filteredInactyearArray))
  
      });
    
  }

  monthwActiveUser() {
    this.AnalysticsService.getActiveUser().then((res: any) => {

      var currentdate = new Date();
      var currentyear = currentdate.getFullYear();

      this.monthArrayList = [];
      this.monthArrayList2 = [];
      this.monthstoreActvalues = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined && res[i].DOJ != "") {
          var date = res[i].DOJ;
          var splitdate = date.split('/');
          var year = splitdate[2];
          var month =('0' +splitdate[1]).slice(-2);

          this.monthArrayList.push(year);
          this.monthArrayList2.push(month);
        }
      }

      for (var j = 0; j <= this.monthArrayList.length; j++) {

        var countData = 0;
        for (var i = 0; i < res.length; i++) {
          if (res[i].DOJ != undefined) {
            var date = res[i].DOJ;
            var splitdate = date.split('/');
            var getYear = splitdate[2];
            var getMonth =splitdate[1];


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

          var Checkflag = false;
          this.monthstoreActvalues.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag = true;

              }
            }
          })

          if (!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid") {
            this.monthstoreActvalues.push({
              Year: this.monthArrayList[j],
              Month: moment(this.monthArrayList2[j], 'MM').format('MMMM'),
              countData: countData
            })
          }
        }
      }

      for(var k=0; k<this.monthstoreActvalues.length; k++) {

        if(this.monthstoreActvalues[k].Year == currentyear){
         this.filteredActyearArray.push({

           Year: this.monthstoreActvalues[k].Year,
           Month: this.monthstoreActvalues[k].Month,
           countData: this.monthstoreActvalues[k].countData
         })
        }
      }
      console.log("currentythinnn :" +JSON.stringify(this.filteredActyearArray))

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

          var Checkflag = false;
          this.monthOpenGroups.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined) {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag = true;
              }
            }
          })

          if (!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid") {
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
          var checkInvalid = this.monthTotalMessage.forEach(element => { });
          var Checkflag = false;
          this.monthTotalMessage.forEach(element => {

            var monthConvert = moment(this.monthArrayList2[j], 'MM').format('MMMM')

            if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined && element.Year != "Invalid date" && element.Month != "Invalid date") {

              if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                Checkflag = true;

              }
            }
          })

          if (!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid date" && this.monthTotalMessage.Year != undefined && this.monthTotalMessage.Month != undefined) {

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
      
      console.log("dvalue" +dvalue)

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          
          let date = res[i].DOJ;
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
          let date = res[i].DOJ;

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



  todayInActiveUser() {
    this.AnalysticsService.gettodayInActiveUser().then((res: any) => {
      this.todayArrayList = [];

      var dvalue = this.convertDate(new Date());

      for (var i = 0; i < res.length; i++) {
        if (res[i].DOJ != undefined) {
          let date = res[i].DOJ;

          this.todayArrayList.push(date);

        }
      }

      var Count = 0;
      for (var i = 0; i < this.todayArrayList.length; i++) {

        if (this.todayArrayList[i] == dvalue) {
          Count++;

        }
      }
      this.tdyinactiveUser = Count;

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
    var day = ('0' + date.getDate()).slice(-2);
    var year = date.getFullYear();
    var mon = date.getMonth()+1;
    var month = ('0' + mon) .slice(-2);
    return day + "/" + month + "/" + year;
  }


  closemodal() {
    this.viewCtrl.dismiss();
  }


//till now

  getSentMsgs() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    this.AnalysticsService.getMessages().then((message: any) => {
      for (let i = 0; i < message.length; i++) {
        message[i].sendcount = 0;
        message[i].recievecount = 0;
        // message[i].userDetails.displayName = '';
        for (let key in message[i]) {
          if (key !== 'id') {
            for (let key1 in message[i][key]) {
              let date = new Date(message[i][key][key1].Filedate)
             
              message[i].year = date.getFullYear();
              message[i].date = date.getDay()
            
              message[i].month =  monthNames[date.getMonth()];
              if (message[i][key][key1].sentby === message[i].id) {
                message[i].sendcount = message[i].sendcount + 1;
              }
              if (message[i][key][key1].sentby !== message[i].id) {
                message[i].recievecount = message[i].recievecount + 1;
              }
            }
          }

        }
      }


      let sendOrder = message;
      // this.userSendmsgs =sendOrder.sort((a, b) => parseFloat(a.sendcount) - parseFloat(b.sendcount));
      this.userSendmsgs = sendOrder.sort((a, b) => parseFloat(b.sendcount) - parseFloat(a.sendcount));
      this.userSendmsgs = this.userSendmsgs.splice(0, 10);
      for (let j = 0; j < this.userSendmsgs.length; j++) {
        this.userProvider.getUserByID(this.userSendmsgs[j].id).then((data) => {
          this.userSendmsgs[j].userDetails = data;
          this.userSendmsgs[j].rank = j + 1;
        })
      }
      
    })
  }




  getReceiveMsgs() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    this.AnalysticsService.getMessages().then((message: any) => {
      console.log("messages" + JSON.stringify(message))
      for (let i = 0; i < message.length; i++) {
        message[i].sendcount = 0;
        message[i].recievecount = 0;
        for (let key in message[i]) {

          if (key !== 'id') {
            for (let key1 in message[i][key]) {
              let date = new Date(message[i][key][key1].Filedate)
             
              message[i].year = date.getFullYear();
              message[i].date = date.getDay()
            
              message[i].month =  monthNames[date.getMonth()];
              if (message[i][key][key1].sentby === message[i].id) {
                message[i].sendcount = message[i].sendcount + 1;
              }
              if (message[i][key][key1].sentby !== message[i].id) {
                message[i].recievecount = message[i].recievecount + 1;
              }
            }
          }

        }
      }


      let reveiveList = message;
      this.userReceivemsgs = message.sort((a1, b1) => parseFloat(b1.recievecount) - parseFloat(a1.recievecount));
      this.userReceivemsgs = this.userReceivemsgs.splice(0, 10);


      for (let j = 0; j < this.userReceivemsgs.length; j++) {
        this.userProvider.getUserByID(this.userReceivemsgs[j].id).then((data) => {
          this.userReceivemsgs[j].userDetails = data;
          console.log("userDetails" + JSON.stringify(this.userReceivemsgs[j].userDetails))
          this.userReceivemsgs[j].rank = j + 1;
        })
      }
      console.log("userReceivemsgs" + JSON.stringify(this.userReceivemsgs));
    })
  }







  gotologout() {

    alert('Are you sure want to Logout?')
    this.navCtrl.push('LoginPage');
  }
  



  // Top 10 groups




}


