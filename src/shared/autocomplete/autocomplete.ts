import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams, Searchbar} from 'ionic-angular';

@Component({
    selector: 'page-autocomplete',
    templateUrl: 'autocomplete.html',
})

export class Autocomplete {

    @ViewChild('searchbar') searchbar: Searchbar;

    searchQuery: string = '';
    items: any = [];
    selected: any = [];
    key: string = '';
    maxSelected: any = [];
    selectedItems: any = [];
    listId: any = [];
    title: string = '';

    constructor(public viewCtrl: ViewController,
        public params: NavParams,
    ) {

       
        // let language = localStorage.getUsers('language');

        // this.selectedItems = localStorage.getUsers('selected') ? JSON.parse(localStorage.getUsers('selected')) : []
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.searchbar.setFocus();        });
    }

    // ngOnInit() {
    //     this.items = JSON.parse(this.params.get('listArray'));
    //     this.selectedItems = JSON.parse(this.params.get('selectedItems'));
    //     this.key = this.params.get('listkey');
    //     this.maxSelected = this.params.get('maxSelected');
    //     this.listId = this.params.get('listId');
    //     this.title = this.params.get('title');
    //     console.log('parameters1', this.items, this.selectedItems, this.key, this.maxSelected)
    // }

    // initializeItems() {
    //     this.items = JSON.parse(this.params.get('listArray'));
    //     this.key = this.params.get('listkey');
    //     this.maxSelected = this.params.get('maxSelected');
    //     console.log('parameters2', this.items, this.selectedItems, this.key, this.maxSelected)
    // }

    getUsers(ev: any) {
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE", ev);
        
        let val = ev.target.value;
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", val);
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item[this.key].toLowerCase().indexOf(val.toLowerCase()) === 0);
            })
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.selectedItems);
    }

    setValue(item: any) {
        let temp: any = [];
        let itemId = item[this.listId];
        if (this.maxSelected == 1) {
            this.selectedItems = [];
            this.selectedItems.push(item);
            this.viewCtrl.dismiss(this.selectedItems);
        } else {
            if (this.maxSelected > this.selectedItems.length) {
                temp = this.selectedItems.filter((item) => {
                    return (item[this.listId] === itemId);
                });
                if (temp.length == 0)
                    this.selectedItems.push(item);
            }
        }
    }

    removeValue(item) {
        console.log(item);
        this.selectedItems = this.selectedItems.filter(obj => obj !== item);
    }
}
