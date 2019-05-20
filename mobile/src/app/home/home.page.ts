import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(public navCtrl: NavController, private iab: InAppBrowser /* 2 */) {
    }

    ngOnInit() {
        const browser = this.iab.create('http://186.150.200.131:8040', '_self', {location: 'no'});
    }
}
