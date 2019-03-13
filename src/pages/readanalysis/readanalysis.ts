import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AnalysticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';
import * as moment from 'moment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@IonicPage()

@Component({
  selector: 'page-readanalysis',
  templateUrl: 'readanalysis.html',
})

export class ReadanalysisPage {

  data;
  timeRanges:any =[
    {name:'0-15',value:[0,15],userCount:0},
    {name:'16-30',value:[16,30],userCount:0},
    {name:'31-60',value:[31,60],userCount:0},
    {name:'61-120',value:[61,120],userCount:0},
    {name:'121-240',value:[121,240],userCount:0},
    {name:'241-480',value:[241,480],userCount:0},
    {name:'>480',value:[480],userCount:0},


  ]

  isSearch:boolean = false;
  fromDate;
  toDate;

  constructor(public AnalysticsService: AnalysticsProvider,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private userProvider: UserProvider,
    public navParams: NavParams) {

    
      this.getUserList();
        
  }



  search() {


  if (this.data == "9.00 to 18.00") {

    let dateString = new Date();
    let m = moment(dateString, 'ddd MMM D YYYY HH:mm:ss ZZ');
   m.set({h: 9, m: 0});
   this.fromDate=m.format();
   m.set({h: 18, m: 0});
   this.toDate=m.format();

    this.getUserList();
    }
  else if (this.data == "18.00 to 9.00") {
    let dateString = new Date();
    let m = moment(dateString, 'ddd MMM D YYYY HH:mm:ss ZZ');
    m.set({h: 18, m: 0});
   this.fromDate=m.format();
   m.add('days', 1);
   m.set({h: 9, m: 0});
   this.toDate=m.format();

     this.getUserList();
  }

  this.isSearch=true;
}

  getUserList() {

    this.timeRanges = [
      {name:'0-15',value:[0,15],userCount:0},
      {name:'16-30',value:[16,30],userCount:0},
      {name:'31-60',value:[31,60],userCount:0},
      {name:'61-120',value:[61,120],userCount:0},
      {name:'121-240',value:[121,240],userCount:0},
      {name:'241-480',value:[241,480],userCount:0},
      {name:'>480',value:[480],userCount:0},
  
    ]
 

    this.AnalysticsService.getMessages().then((message: any) => {
      for (let i = 0; i < message.length; i++) {
        for (let key in message[i]) {
          if (key !== 'id') {                                
            for (let key1 in message[i][key]) {
              for(let j=0;j < this.timeRanges.length;j++){
                let Filedate = new Date(message[i][key][key1].Filedate); 
                let start_date = this.fromDate;
                let end_date = moment(Filedate, 'YYYY-MM-DD HH:mm:ss');

                if(end_date.isBetween(this.fromDate, this.toDate)){


                 let duration = moment.duration(start_date.diff(end_date));   
                let minits = duration.asMinutes();  
                           
                let mini = Math.round(minits);     
                if(this.timeRanges[j].value.length===2){
             
                  if(this.timeRanges[j].value[0]>= mini && this.timeRanges[j].value[1]<= mini){
                    this.timeRanges[j].userCount=this.timeRanges[j].userCount + 1;
                                               
                  }
                } else {
                  if(this.timeRanges[j].value[0]>= mini){
                    this.timeRanges[j].userCount=this.timeRanges[j].userCount + 1;
                  }
                }


              }


              }
             
            }
          }

        }
      }
    })
        
  }
   
  }








  