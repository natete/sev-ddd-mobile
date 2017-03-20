import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { Session } from '../../providers/session/session';
import { SessionsService } from '../../providers/session/sessions.service';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs';
import { DetailPage } from '../detail/detail.page';
import { ErrorPage } from '../error/error';

@Component({
  selector: 'page-day',
  templateUrl: 'day.page.html'
})
export class DayPage {

  private subscription: Subscription;
  sessions: Session[] = [];
  title: string;
  sessionIcons = {
    development: 'assets/images/development.svg',
    frontend: 'assets/images/frontend.svg',
    beingHuman: 'assets/images/being-human.svg',
    caseStudies: 'assets/images/case-studies.svg',
    devOps: 'assets/images/devops.svg',
    performance: 'assets/images/performance.svg',
    other: 'assets/images/other.svg',
    siteBuilding: 'assets/images/site-building.svg',
    poison: 'assets/images/poison.svg'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private sessionsService: SessionsService) {
    this.title = moment(this.navParams.data)
      .format('DD dddd')
      .toLocaleUpperCase();
  }

  ionViewDidLoad() {

    const loader = this.loadingCtrl.create({
      content: 'Loading sessions...'
    });

    loader.present();

    this.subscription = this.sessionsService.getProgram(this.navParams.data)
                            .do(sessions => loader.dismissAll())
                            .subscribe(
                              sessions => {
                                this.sessions = sessions;
                                this.subscription.unsubscribe();
                              }, () => {
                                loader.dismissAll();
                                this.navCtrl.setRoot(ErrorPage, 'Error getting sessions');
                              }
                            );
  }

  getHeader(record, recordIndex, records): string {
    if (recordIndex === 0) {
      return record.startTime;
    } else {
      return record.startTime === records[recordIndex - 1].startTime ? null : record.startTime;
    }
  }

  goToSession(session): void {
    if (session.type) {
      this.navCtrl.push(DetailPage, { session: session, date: this.navParams.data });
    }
  }
}
