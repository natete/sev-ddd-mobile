import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-error',
  templateUrl: 'error.html'
})
export class ErrorPage {

  errorMsg: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.errorMsg = this.navParams.data;
  }

  ionViewDidLoad() {

  }
}
