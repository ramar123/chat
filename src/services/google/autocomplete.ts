import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';
// import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from 'ionic-native';
import {ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

declare var google;

@Component({
    templateUrl: './autocomplete.html',
    selector: 'autocomplete'
})

export class GoogleAutocomplete {
    public latitude: number;
    public longitude: number;
    public zoom: number;

    autocompleteItems;
    autocomplete;

    //service: any;

    service = new google.maps.places.AutocompleteService();
    @ViewChild("search") search;
    public searchElementRef: ElementRef;

    constructor(public viewCtrl: ViewController,
        private zone: NgZone,
        private mapsAPILoader: MapsAPILoader,
    ) {

        let language = localStorage.getItem('language');
        // this language will be used as a fallback when a translation isn't found in the current language
        //    if (language) {
        //      translate.use(language);
        //    } else {
        //      translate.use('English');
        //    }
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }

    ionViewDidLoad() {
        console.log("View loaded");
        setTimeout(() => {
            this.search.setFocus();
        }, 500);
    }

    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;


        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            //   types: ["address"]
            // });
            // autocomplete.addListener("place_changed", () => {
            //   this.zone.run(() => {
            //     //get the place result
            //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            //
            //     //verify result
            //     if (place.geometry === undefined || place.geometry === null) {
            //       return;
            //     }
            //
            //     //set latitude, longitude and zoom
            //     this.latitude = place.geometry.location.lat();
            //     this.longitude = place.geometry.location.lng();
            //     this.zoom = 12;
            //   });
            // });
            this.service = new google.maps.places.AutocompleteService();
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    chooseItem(item: any) {

        this.viewCtrl.dismiss(item);
    }

    updateSearch() {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }

        let me = this;
        this.service.getPlacePredictions({
            input: this.autocomplete.query,
            componentRestrictions: {country: 'IN'}
        }, function (predictions, status) {
            console.log("PREDICTIONS", predictions);
            me.autocompleteItems = [];
            me.zone.run(function () {
                if (predictions) {
                    predictions.forEach(function (prediction) {
                        me.autocompleteItems.push(prediction.description);
                    });
                }
            });
        });
    }
}
