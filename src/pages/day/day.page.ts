import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { Session } from '../../providers/Session';
import { SessionsService } from '../../providers/sessions.service';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'page-day',
  templateUrl: 'day.page.html'
})
export class DayPage {

  private subscription: Subscription;
  sessions: Session[] = [];
  title: string;
  sessionIcons = {
    Development: 'assets/images/development.svg',
    Frontend: 'assets/images/frontend.svg',
    'Being human': 'assets/images/being-human.svg',
    'Case studies': 'assets/images/case-studies.svg',
    Devops: 'assets/images/devops.svg',
    Performance: 'assets/images/performance.svg',
    Other: 'assets/images/other.svg',
    'Site building': 'assets/images/site-building.svg',
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

    this.subscription = this.sessionsService.getSessions(this.navParams.data)
                            .do(sessions => loader.dismissAll())
                            .subscribe(sessions => {
                              this.sessions = sessions;
                              this.subscription.unsubscribe();
                            });
  }

  getHeader(record, recordIndex, records): string {
    if (recordIndex === 0) {
      return record.time;
    } else {
      return record.time === records[recordIndex - 1].time ? null : record.time;
    }
  }

  goToSession(session): void {
    this.navCtrl.push(DetailPage, {session: session, date: this.navParams.data});
  }
}
