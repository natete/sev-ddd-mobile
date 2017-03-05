import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Calendar } from '@ionic-native/calendar';
import { CalendarOptionsExtended } from './calendar-options-extended';
import { Session } from '../session/session';
import * as moment from 'moment';

@Injectable()
export class CalendarService {

  private hasReadWritePermission: boolean;
  CALENDAR_NAME = 'Seville DrupalDevDays';
  CALENDAR_COLOR = '#28A8E0';
  CALENDAR_OPTIONS: CalendarOptionsExtended = {
    accountName: 'DrupalDevDays',
    calendarName: this.CALENDAR_NAME,
    calendarColor: this.CALENDAR_COLOR
  };

  constructor() { }

  /**
   * Initializes the service checking if the application has permission to use the calendar and then checking if the
   * DrupalDevDays calendar exists.
   * @returns {Promise<void>} resolves when everything has been checked.
   */
  init(): Promise<void> {
    return Calendar.hasReadWritePermission()
                   .then(hasReadWritePermission => {
                     this.hasReadWritePermission = hasReadWritePermission;

                     if (hasReadWritePermission) {
                       return this.initDDDCalendar();
                     } else {
                       return Promise.resolve();
                     }
                   });
  }

  /**
   * Initializes DrupalDevDays calendar creating it if it doesn't exist.
   * @returns {Promise<void>} resolves if the calendar has been created or it already exists, rejected if an error is
   * thrown while creating the calendar.
   */
  initDDDCalendar(): Promise<void> {

    return Calendar.listCalendars()
                   .then((calendars: any[]) => this.handleListOfCalendars(calendars));
  }

  addSession(session: Session, date: string): Promise<any> {
    return this.initDDDCalendar()
               .then(
                 () => this.createSession(session, date),
                 () => this.hasReadWritePermission = false
               );
  }

  private handleListOfCalendars(calendars: any[]): Promise<any> {
    const drupalDevDaysCalendar = calendars.find(calendar => calendar.name === this.CALENDAR_NAME);

    if (drupalDevDaysCalendar) {
      this.CALENDAR_OPTIONS.calendarId = drupalDevDaysCalendar.id;
      return Promise.resolve();
    } else {
      console.log('creating calendar');
      return Calendar
        .createCalendar(this.CALENDAR_OPTIONS)
        .then(calendarId => this.CALENDAR_OPTIONS.calendarId = calendarId);
    }
  }

  private createSession(session: Session, date: string): Promise<void> {
    const startTime = session.startTime.split(':');
    const startDate = moment(date)
      .hour(parseInt(startTime[0]))
      .minute(parseInt(startTime[1]));

    const endTime = session.endTime.split(':');
    const endDate = moment(date)
      .hour(parseInt(endTime[0]))
      .minute(parseInt(endTime[1]));

    return Calendar
      .findEventWithOptions(
        session.name,
        'Seville, El Fuerte de Isla Mágica',
        session.getSessionNotes(),
        startDate.toDate(),
        endDate.toDate(),
        this.CALENDAR_OPTIONS
      )
      .then(event => {
        if (event && event.length) {
          return Promise.resolve();
        } else {
          return Calendar.createEventWithOptions(
            session.name,
            'Seville, El Fuerte de Isla Mágica',
            session.getSessionNotes(),
            startDate.toDate(),
            endDate.toDate(),
            this.CALENDAR_OPTIONS
          );
        }
      });

  }

}
