import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import * as moment from 'moment';
import { DayPage } from '../pages/day/day.page';

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

  constructor(platform: Platform) {
    platform.ready()
            .then(() => {
              // Okay, so the platform is ready and our plugins are available.
              // Here you can do any higher level native things you might need.
              StatusBar.styleDefault();
              Splashscreen.hide();

              const now = moment();

              this.nav.setRoot(DayPage, (this.pages.find(page => now.isSame(page.date)) || this.pages[0]).date.format('YYYY-MM-D'))
            });
  }

  goToDay(toPage) {
    this.nav.setRoot(DayPage, this.pages.find(page => toPage.date.isSame(page.date))
                                  .date
                                  .format('YYYY-MM-D'));

  }
}