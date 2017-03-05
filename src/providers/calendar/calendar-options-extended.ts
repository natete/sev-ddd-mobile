import { CalendarOptions } from '@ionic-native/calendar';

export interface CalendarOptionsExtended extends CalendarOptions {
  accountName?: string;
  calendarColor?: string;
}