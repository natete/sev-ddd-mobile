import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Session } from '../../providers/session/session';
import * as moment from 'moment';
import { CalendarService } from '../../providers/calendar/calendar.service';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.page.html'
})
export class DetailPage {

  private sessionDate: string;
  session: Session;
  title: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private calendarService: CalendarService) {
    this.session = new Session(this.navParams.data.session);

    this.sessionDate = this.navParams.data.date;

    this.title = moment(this.navParams.data.date)
        .format('DD dddd')
        .toLocaleUpperCase() + ` - ${this.session.startTime}`;
  }

  addToCalendar(): void {
    this.calendarService.addSession(this.session, this.sessionDate)
        .then(() => this.handleSessionAdded())
        .catch(() => this.handleError());
  }

  private handleSessionAdded(): void {
    const toast = this.toastCtrl.create({
      message: 'Session was added successfully',
      duration: 3000,
      cssClass: 'success'
    });

    toast.present();
  }

  private handleError(): void {
    const toast = this.toastCtrl.create({
      message: 'There was an error adding session',
      duration: 3000,
      cssClass: 'error'
    });

    toast.present();
  }

}
