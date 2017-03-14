import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import { Session } from '../../providers/session/session';
import { CalendarService } from '../../providers/calendar/calendar.service';
import { SessionsService } from '../../providers/session/sessions.service';

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
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private calendarService: CalendarService,
              private sessionsService: SessionsService) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: 'Loading session...'
    });

    loader.present();

    // this.session = new Session(this.navParams.data.session);

    this.sessionDate = this.navParams.data.date;

    this.title = moment(this.navParams.data.date)
        .format('DD dddd')
        .toLocaleUpperCase() + ` - ${this.navParams.data.session.startTime}`;

    this.sessionsService.getSession(this.navParams.data.session)
        .do(() => loader.dismissAll())
        .subscribe(session => this.session = session);
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
