import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Calendar } from '@ionic-native/calendar';
import { CalendarOptionsExtended } from './calendar-options-extended';
import { Session } from '../session/session';
import * as moment from 'moment';

@Injectable()
export class CalendarService {

  CALENDAR_NAME = 'Seville DrupalDevDays';
  CALENDAR_COLOR = '#28A8E0';
  CALENDAR_OPTIONS: CalendarOptionsExtended = {
    accountName: 'DrupalDevDays',
    calendarName: this.CALENDAR_NAME,
    calendarColor: this.CALENDAR_COLOR
  };

  constructor() { }

  /**
   * Add the given session to the calendar in the given date.
   * @param session the session to be added
   * @param date
   * @returns {Promise<TResult|void>}
   */
  addSession(session: Session, date: string): Promise<any> {
    return this.initDDDCalendar()
               .then(() => this.createSession(session, date))
               .catch(() => Promise.reject(null));
  }

  /**
   * Initializes DrupalDevDays calendar creating it if it doesn't exist.
   * @returns {Promise<void>} resolves if the calendar has been created or it already exists, rejected if an error is
   * thrown while creating the calendar.
   */
  initDDDCalendar(): Promise<void> {

    return Calendar.listCalendars()
                   .then((calendars: any[]) => this.handleListOfCalendars(calendars),
                     () => Promise.reject(null));
  }

  private handleListOfCalendars(calendars: any[]): Promise<any> {
    const drupalDevDaysCalendar = calendars.find(calendar => calendar.name === this.CALENDAR_NAME);

    if (drupalDevDaysCalendar) {
      this.CALENDAR_OPTIONS.calendarId = drupalDevDaysCalendar.id;
      return Promise.resolve();
    } else {

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
        null,
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
