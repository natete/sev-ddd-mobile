import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/Session';
import * as moment from 'moment';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.page.html'
})
export class DetailPage {

  session: Session;
  title: string;
  
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.session = this.navParams.data.session;

    this.title = moment(this.navParams.data.date)
      .format('DD dddd')
      .toLocaleUpperCase() + ` - ${this.session.time}`;
  }

  ionViewDidLoad() {
    
  }

}
