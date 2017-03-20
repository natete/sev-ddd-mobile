import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DayPage } from '../pages/day/day.page';
import { SessionsService } from '../providers/session/sessions.service';
import { DetailPage } from '../pages/detail/detail.page';
import { CalendarService } from '../providers/calendar/calendar.service';
import { NotificationsService } from '../providers/notifications/notifications.service';
import { ErrorPage } from '../pages/error/error';

@NgModule({
  declarations: [
    MyApp,
    DayPage,
    DetailPage,
    ErrorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DayPage,
    DetailPage,
    ErrorPage
  ],
  providers: [
    CalendarService,
    NotificationsService,
    SessionsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
