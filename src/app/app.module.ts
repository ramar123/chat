import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { MyApp } from './app.component';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { config } from './app.firebaseconfig';
import { UserProvider} from '../providers/user/user';
import { GroupsProvider} from '../providers/groups/groups'
import { AnalysticsProvider } from '../providers/analytics/analytics';
import { GroupopenProvider } from '../providers/groupopen/groupopen';
import { ChartsModule } from 'ng2-charts';
import { MessagereportProvider } from '../providers/messagereport/messagereport';
import { UserreportProvider } from '../providers/userreport/userreport';
import { PagerService } from './services/index';
import {SortPipe } from '../pipes/sort/sort';
import { ComponentsModule} from '../components/components.module'
import {NativeGeocoder} from '@ionic-native/native-geocoder';

// import {AgmCoreModule} from "@agm/core";
// import {Autocomplete} from '../shared/autocomplete/autocomplete';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyApp,
     SortPipe,
    
   ],


   imports: [
    BrowserModule,
    ChartsModule,
    ComponentsModule,
    GooglePlaceModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
  //   AgmCoreModule.forRoot({
  //     apiKey: "AIzaSyAfrPs8Kpw3StRs-CEAyNdkASwdW2GguyA",
  //     libraries: ["places"]
  // }),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // Autocomplete
   
  ],


  providers: [
    StatusBar,
    SplashScreen, AngularFireAuth,
    UserProvider,GroupsProvider,AnalysticsProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,GroupopenProvider,
    GroupopenProvider,PagerService,
    MessagereportProvider,
    UserreportProvider,
    
    
    
  ]
})
export class AppModule { }

