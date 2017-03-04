import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DayPage } from '../pages/day/day.page';
import { SessionsService } from '../providers/sessions.service';
import { DetailPage } from '../pages/detail/detail.page';

@NgModule({
  declarations: [
    MyApp,
    DayPage,
    DetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DayPage,
    DetailPage
  ],
  providers: [
    SessionsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}