import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/statusbar';
import { Splashscreen } from '@ionic-native/splashscreen';
import * as moment from 'moment';
import { DayPage } from '../pages/day/day.page';
import { NotificationsService } from '../providers/notifications/notifications.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages = [
    { date: moment('2017-03-21') },
    { date: moment('2017-03-22') },
    { date: moment('2017-03-23') },
    { date: moment('2017-03-24') },
    { date: moment('2017-03-25') }
  ];

  constructor(platform: Platform,
              private notificationsService: NotificationsService) {
    platform.ready()
            .then(() => {
              // Okay, so the platform is ready and our plugins are available.
              // Here you can do any higher level native things you might need.
              StatusBar.styleDefault();
              Splashscreen.hide();

              this.notificationsService.init();

              this.goToFirstDay();
            });
  }

  private goToFirstDay() {
    const now = moment();

    this.nav.setRoot(DayPage, (this.pages.find(page => now.isSame(page.date)) || this.pages[0]).date.format('YYYY-MM-D'))
  }

  goToDay(toPage) {
    this.nav.setRoot(DayPage, this.pages.find(page => toPage.date.isSame(page.date))
                                  .date
                                  .format('YYYY-MM-D'));

  }
}
