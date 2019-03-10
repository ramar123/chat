import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagereportProvider } from '../../providers/messagereport/messagereport';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { LoginPage } from '../login/login';
//import Highcharts from 'highcharts';
import { JsonPipe } from '@angular/common';
import Highcharts from 'highcharts';


@IonicPage()


@Component({
  selector: 'page-messagereport',
  templateUrl: 'messagereport.html',
})


export class MessagereportPage {
  data;
  selectedmonth;
  Year;
  monthTotalMessage;
  daysTotalMessage;
  chartYearwise;
  chartDaywise;
  
  chartOptions : any;
  monthArrayList = [];
  monthArrayList2 = [];
  daysArrayList = [];
  daysnumbers = [];
  monthstoreTotalMessages = [];

  numberOfYears;
  
  GroupTotalMessages = [];
  
    constructor(public MessageService : MessagereportProvider, public navCtrl: NavController, public navParams: NavParams) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad MessagereportPage');
    }

    daysInThisMonth(now) {
       now = new Date();
       var d = now.getFullYear;
      return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }


    yearList(yearlist){

   
      if(yearlist == "Year"){
        
this.yearlistOut();

      }
    }
  
    searchGraph(value1, value2) {
  
      if(value1=="Year" && value2 != "") {
        console.log("Checkkkk"+value1 +"////"+value2);
              this.monthwTotalMessages(value2);
            //  this.yearGroupMessages(value2);
  
        
           }
           else if(value1 == "Month" && value2 !="") {

            var dvalue = this.daysInThisMonth(new Date());
            var d = new Date();
            var currentYear = d.getFullYear();
          
            console.log("ttttttttt" +dvalue +currentYear);

            this.daysTotalMessages(value2,dvalue, currentYear);

           }
           else{
             alert ("Please select Month/Year");
           }
    }


    yearlistOut(){

      this.MessageService.getYearTotalmessages().then((res: any) => {
    
        var Count = 1;
        this.monthArrayList = [];
        this.monthArrayList2 = [];
        this.numberOfYears = [];
    
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

            //  console.log("ssssss" +this.monthArrayList.length +"lllllll"+ this.monthArrayList2.length);

            //  console.log("lklkllklk" +getYear+"======="+ this.monthArrayList[j]+"@@@@"+getMonth+"======="+this.monthArrayList2[j])
    
              if (getYear == this.monthArrayList[j] && getMonth == this.monthArrayList2[j]) {
    
                countData++;
    
              }
            }
          }
    
          if (this.numberOfYears.length == 0) {
            this.numberOfYears.push({
              Year: this.monthArrayList[j],
              Month: this.monthArrayList2[j],
              countData: countData
            })
    
               console.log("zzzzzzzz" +JSON.stringify(this.numberOfYears)) 
          }
          else {
            var checkInvalid = this.numberOfYears.forEach(element => {});
            var Checkflag=false;
            this.numberOfYears.forEach(element => {
    
              var monthConvert = this.monthArrayList2[j];
    
              if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined && element.Year != "Invalid date" && element.Month != "Invalid date") {
    
                if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                  Checkflag=true;
    
                }
              }
            })

            console.log("march" +this.monthArrayList[j]+"======="+ this.monthArrayList2[j]+"=========="+this.numberOfYears.Year )
           
            if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid date" && this.numberOfYears.Year != undefined && this.numberOfYears.Month != undefined )
            {  
    
              this.numberOfYears.push({
                Year: this.monthArrayList[j],
                Month: this.monthArrayList2[j],
                countData: countData
              })
    
            
          }
        }
       
    
      }
     
      });
    }
    



  
    monthwTotalMessages(value){
  console.log("call" +value)
  
      
      this.MessageService.getYearTotalmessages().then((res: any) => {
  
        var Count = 1;
        this.monthArrayList = [];
        this.monthArrayList2 = [];
        this.monthTotalMessage = [];
        this.chartYearwise = [];
  
  
        var cJan = 0;
        var cFeb = 0;
        var cMar = 0;
        var cApr = 0;
        var cMay = 0;
        var cJun = 0;
        var cJul = 0;
        var cAug = 0;
        var cSep = 0;
        var cOct = 0;
        var cNov = 0;
        var cDec = 0;
  
        for (var i = 0; i < res.length; i++) {
          if (res[i].Filedate != undefined) {
            let date = res[i].Filedate.substring(10, 15);//.substring(0,4);
            let month = res[i].Filedate.substring(4, 7);
  
            this.monthArrayList.push(date);
            this.monthArrayList2.push(month);
  
          }
        }
        console.log("jjjjjjjj" +JSON.stringify(this.monthArrayList))
        console.log("kkkkkkkkk" +JSON.stringify(this.monthArrayList2))
  
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
              Month: this.monthArrayList2[j],
              countData: countData
            })
  
            console.log("llllllll" +value +"///////"+ this.monthArrayList[j])
            if(value != this.monthArrayList[j]) {
  console.log("vvvvvvv" +this.monthArrayList[j]+";;;;;"   +this.monthArrayList2[j] +countData)
              this.chartYearwise.push({
                Year: this.monthArrayList[j],
                Month: this.monthArrayList2[j],
                countData: countData
              })
            }
          }
          else {
            var checkInvalid = this.monthTotalMessage.forEach(element => {});
            var Checkflag=false;
            this.monthTotalMessage.forEach(element => {
  
              var monthConvert = this.monthArrayList2[j];
  
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
                Month: this.monthArrayList2[j],
                countData: countData
              })
  
              if(value == this.monthArrayList[j]) {
  
                this.chartYearwise.push({
                  Year: this.monthArrayList[j],
                  Month: this.monthArrayList2[j],
                  countData: countData
                })
              }
  
            }
          }
        }
        for(i=0; i<this.chartYearwise.length;i++) {
       console.log("arrayvalues: " +JSON.stringify(this.chartYearwise) )
  
     if(this.chartYearwise[i].Month != undefined) {
       if("Jan" == this.chartYearwise[i].Month) {
         cJan = this.chartYearwise[i].countData; 
        }
        if("Feb" == this.chartYearwise[i].Month) {
          cFeb = this.chartYearwise[i].countData; 
         }
         if("Mar" == this.chartYearwise[i].Month) {
          cMar = this.chartYearwise[i].countData; 
         }
        if("Apr" == this.chartYearwise[i].Month) {
          cApr = this.chartYearwise[i].countData; 
         }
         if("May" == this.chartYearwise[i].Month) {
          cMay = this.chartYearwise[i].countData; 
         }
         if("Jun" == this.chartYearwise[i].Month) {
          cJun = this.chartYearwise[i].countData; 
         }
         if("Jul" == this.chartYearwise[i].Month) {
          cJul = this.chartYearwise[i].countData; 
         }
         if("Aug" == this.chartYearwise[i].Month) {
          cAug == this.chartYearwise[i].countData; 
         }
         if("Sep" == this.chartYearwise[i].Month) {
          cSep = this.chartYearwise[i].countData; 
         }
         if("Oct" == this.chartYearwise[i].Month) {
          cOct = this.chartYearwise[i].countData; 
         }
         if("Nov" == this.chartYearwise[i].Month) {
          cNov = this.chartYearwise[i].countData; 
         }
         if("Dec" == this.chartYearwise[i].Month) {
          cDec = this.chartYearwise[i].countData; 
         }
        }
      }
      console.log("month check" +cJan +cFeb)
     var obj = [cJan, cFeb, cMar, cApr, cMay, cJun, cJul, cAug, cSep, cOct, cNov, cDec];
  
     this.chart(obj);
      });
    
  
    }

   /* yearGroupMessages(value){
      this.MessageService.getYearTotalmessages().then((res: any) => {
  
        var Count = 1;
        this.monthArrayList = [];
        this.monthArrayList2 = [];
        this.GroupTotalMessages = [];
        this.chartYearwise = [];
  
  
        var cJan = 0;
        var cFeb = 0;
        var cMar = 0;
        var cApr = 0;
        var cMay = 0;
        var cJun = 0;
        var cJul = 0;
        var cAug = 0;
        var cSep = 0;
        var cOct = 0;
        var cNov = 0;
        var cDec = 0;
  
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
  
          if (this.GroupTotalMessages.length == 0) {
            this.GroupTotalMessages.push({
              Year: this.monthArrayList[j],
              Month: this.monthArrayList2[j],
              countData: countData
            })
  
            if(value != this.monthArrayList[j]) {
              this.chartYearwise.push({
                Year: this.monthArrayList[j],
                Month: this.monthArrayList2[j],
                countData: countData
              })
            }
          }
          else {
            var checkInvalid = this.GroupTotalMessages.forEach(element => {});
            var Checkflag=false;
            this.GroupTotalMessages.forEach(element => {
  
              var monthConvert = this.monthArrayList2[j];
  
              if (monthConvert != "Invalid date" && this.monthArrayList[j] != undefined && element.Year != "Invalid date" && element.Month != "Invalid date") {
  
                if (element.Year == this.monthArrayList[j] && element.Month == monthConvert) {
                  Checkflag=true;
  
                }
              }
            })
           
            if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != "Invalid date" && this.monthTotalMessage.Year != undefined && this.monthTotalMessage.Month != undefined)
            {  
  
              this.GroupTotalMessages.push({
                Year: this.monthArrayList[j],
                Month: this.monthArrayList2[j],
                countData: countData
              })
  
              if(value == this.monthArrayList[j]) {
  
                this.chartYearwise.push({
                  Year: this.monthArrayList[j],
                  Month: this.monthArrayList2[j],
                  countData: countData
                })
              }
  
            }
          }
        }
        for(i=0; i<this.chartYearwise.length;i++) {
       console.log("arrayvalues: " +this.chartYearwise[i].Month) 
  
     if(this.chartYearwise[i].Month != undefined) {
       if("Jan" == this.chartYearwise[i].Month) {
         cJan = this.chartYearwise[i].countData; 
        }
        if("Feb" == this.chartYearwise[i].Month) {
          cFeb = this.chartYearwise[i].countData; 
         }
         if("Mar" == this.chartYearwise[i].Month) {
          cMar = this.chartYearwise[i].countData; 
         }
        if("Apr" == this.chartYearwise[i].Month) {
          cApr = this.chartYearwise[i].countData; 
         }
         if("May" == this.chartYearwise[i].Month) {
          cMay = this.chartYearwise[i].countData; 
         }
         if("Jun" == this.chartYearwise[i].Month) {
          cJun = this.chartYearwise[i].countData; 
         }
         if("Jul" == this.chartYearwise[i].Month) {
          cJul = this.chartYearwise[i].countData; 
         }
         if("Aug" == this.chartYearwise[i].Month) {
          cAug == this.chartYearwise[i].countData; 
         }
         if("Sep" == this.chartYearwise[i].Month) {
          cSep = this.chartYearwise[i].countData; 
         }
         if("Oct" == this.chartYearwise[i].Month) {
          cOct = this.chartYearwise[i].countData; 
         }
         if("Nov" == this.chartYearwise[i].Month) {
          cNov = this.chartYearwise[i].countData; 
         }
         if("Dec" == this.chartYearwise[i].Month) {
          cDec = this.chartYearwise[i].countData; 
         }
        }
      }
      console.log("month check" +cJan +cFeb)
     var obj = [cJan, cFeb, cMar, cApr, cMay, cJun, cJul, cAug, cSep, cOct, cNov, cDec];
  
     this.chart(obj);
      });
    } */


    daysTotalMessages(month, totday, currentYear) {

      console.log("call" +month + totday)
  
      
      this.MessageService.getYearTotalmessages().then((res: any) => {
  
        var Count = 1;
        this.monthArrayList = [];
        this.monthArrayList2 = [];
        this.daysArrayList = [];
        this.daysTotalMessage = [];
        this.chartDaywise = [];
        this.daysnumbers = [];

  
        for (var i = 0; i < res.length; i++) {
          if (res[i].Filedate != undefined) {
            let date = res[i].Filedate.substring(10, 15);//.substring(0,4);
            let amonth = res[i].Filedate.substring(4, 7);
            let days = res[i].Filedate.substring(8,10);

            if(date == currentYear && amonth==month){
            this.monthArrayList.push(date);
            this.monthArrayList2.push(month);
            this.daysArrayList.push(days);
            }
          }
        }

        for (var i=0; i<totday; i++){

          let num = i+1;
          this.daysnumbers.push(num);
        }
           console.log("numbers" +this.daysnumbers)

    
        for (var j = 0; j <= this.monthArrayList.length; j++) {
  
          var countData = 0;
          for (var i = 0; i < res.length; i++) {

            if (res[i].Filedate != undefined) {
              var getYear = res[i].Filedate.substring(10, 15);
              var getMonth = res[i].Filedate.substring(4, 7);
              var getDays = res[i].Filedate.substring(8,10);

      

              if(this.monthArrayList[j] != undefined && this.monthArrayList2[j] !=undefined && this.daysArrayList[j] !=undefined){

                

              if (getYear == currentYear && getMonth == this.monthArrayList2[j] && getDays == this.daysArrayList[j]) {
              // console.log("aaaaaaaaassssssssss" +getYear +"========"+this.monthArrayList[j] +"========"+getMonth +"========"+this.monthArrayList2[j]+"========"+getDays +"========"+this.daysArrayList[j])
                countData++;

              }
            }
            }
      }

      if (this.daysTotalMessage.length == 0) {
        this.daysTotalMessage.push({
          Year: this.monthArrayList[j],
          Month: this.monthArrayList2[j],
          Days: this.daysArrayList[j],
          countData: countData
        })

       
      }
      else {
       
        var Checkflag=false;
        this.daysTotalMessage.forEach(element => {


          if (this.monthArrayList2[j]!= undefined && this.monthArrayList[j] != undefined && this.daysArrayList[j] != undefined && element.Year != undefined && element.Month != undefined) {

           // console.log("check 2")

            if (element.Year == this.monthArrayList[j] && element.Month == this.monthArrayList2[j] && element.Days == this.daysArrayList[j] ) {
           //   console.log("check 3")
              Checkflag=true;

            }
          }
        })

      //  console.log("checkkk 5"  +this.daysArrayList[j] +"============="+ this.monthArrayList[j]+"==========="+ this.monthArrayList2[j] )
       
        if(!Checkflag && this.monthArrayList[j] != undefined && this.monthArrayList2[j] != undefined && this.daysArrayList[j])
        {  

          console.log("check 4")
          this.daysTotalMessage.push({
            Year: this.monthArrayList[j],
            Month: this.monthArrayList2[j],
            Days: this.daysArrayList[j],
            countData: countData
          })

        //  console.log("ssss1: " +this.daysTotalMessage[0].countData) 

        }
//console.log("ssssss2: " +this.daysTotalMessage[0].countData) 

      }
      
    }

    console.log("final valut: " +JSON.stringify(this.daysTotalMessage))

for(var  k = 0; k < this.daysnumbers.length; k++) {
  console.log("kkkkkk" +k)
    for(var t = 0; t < this.daysTotalMessage.length; t++) {
      console.log("summm" +this.daysnumbers.length )

     if(k<10){

      console.log("summm" + ('0' + this.daysnumbers[k]).slice(-2)  )
      if(('0' + this.daysnumbers[k]).slice(-2) == this.daysTotalMessage[t].Days){
        console.log("EQUAK")
        var index = this.getIndexIfObjWithOwnAttr(this.chartDaywise, 'Days', this.daysTotalMessage[t].Days);
        this.chartDaywise.push ({
          Days:this.daysnumbers[k],
          countData: this.daysTotalMessage[t].countData
          
        })

      }
     }
     else{
      if(this.daysnumbers[k] == this.daysTotalMessage[t].Days){
        console.log("solve")
        var index = this.getIndexIfObjWithOwnAttr(this.chartDaywise, 'Days', this.daysTotalMessage[t].Days);
        this.chartDaywise.push ({
          Days:this.daysnumbers[k],
          countData: this.daysTotalMessage[t].countData
          
        })

      }
     }
     if(index != -1){
      console.log("solve 2")
      this.chartDaywise.push ({
        Days: this.daysnumbers[k],
        countData: 0
      })
    }
    }
   // console.log("llllllll" +index)
   

   

}
var pushDays=[];
var pushCount = [];
    for (var m=0; m<this.chartDaywise.length; m++){

      pushDays.push(this.chartDaywise[m].Days)
      pushCount.push(this.chartDaywise[m].countData)
    
       
    }

    this.chartForDays(pushDays, pushCount)
    console.log("vcvcvvc" +pushDays)
    //console.log("jjjjjj" +pushCount)


      console.log("final valut: " +JSON.stringify(this.chartDaywise))
      });

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





    //draw graph
  
    chart(value){
      console.log("valllll" +value)
  
       Highcharts.chart('container', {

     
 
  
       title: {
       text: 'Monthly Message Count'
     },
  
     yAxis: {
         title: {
             text: 'Number of Message'
         }
     },
     xAxis: {
         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
     },

     

      series: [{
              type:'line',
             name: 'Message',
             data: value
  
         },
         {
          type:'line',
           name: 'Group Messages',
           data: [23,0,0,0,4,23,0,0,0,0,0,2]

      }
     ]
  
       });
    
  
      }


    chartForDays(days, count){

      console.log("cahrtttt" +days +"hhhhhhhh"+ count )
      Highcharts.chart('container', {
  
        title: {
          text: 'Monthly Message Count'
      },
    
      yAxis: {
          title: {
              text: 'Number of Message'
          }
      },
      xAxis: {
          categories: days
      },
    
      series: [{
             type:'line',
              name: 'Message',
              data: count
    
          },
          {
            type:'line',
            name: 'Group Messages',
            data: [23,0,0,0,4,23,0,0,0,0,0,2]
 
       }]
    
        });
    }




    
}