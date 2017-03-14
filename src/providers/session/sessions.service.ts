import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs';
import { Session } from './session';
import { RawSession } from './raw-session';
import { Speaker } from './speaker';
import { Utils } from '../../shared/utils';

@Injectable()
export class SessionsService {

  private readonly drupalUrl = 'https://seville2017.drupaldays.org/api';

  private readonly dates = {
    '2017-03-21': 126,
    '2017-03-22': 127,
    '2017-03-23': 128,
    '2017-03-24': 129,
    '2017-03-25': 130,
  };

  private userIds: Set<string>;
  private sessionsStream: Subject<Session[]>;

  constructor(private http: Http) {
  }

  getProgram(date: string): Observable<Session[]> {
    this.sessionsStream = new Subject<Session[]>();
    this.userIds = new Set<string>();
    const dateCode = this.dates[date];
    this.http
        .get(`${this.drupalUrl}/program/${dateCode}`)
        .map(data => data.json() as RawSession[])
        .map(rawSessions => rawSessions.map(rawSession => this.transformToSession(rawSession)))
        .map(sessions => sessions.sort((s1, s2) => s1.startTime.localeCompare(s2.startTime)))
        .subscribe(sessions => this.addSpeakersToSession(sessions));

    return this.sessionsStream.asObservable();
  }

  getSession(session: Session): Observable<Session> {
    return this.http
               .get(`${this.drupalUrl}/sessions/${session.id}`)
               .map(data => data.json()[0] as RawSession)
               .map(rawSession => this.addDetailsToSession(rawSession, session));
  }

  private addSpeakersToSession(sessions: Session[]) {

    this.http
        .get(`${this.drupalUrl}/users/${Array.from(this.userIds).join(',')}`)
        .map(res => res.json())
        .subscribe(rawUsers => {
          const speakers = rawUsers.map(rawUser => this.transformToUser(rawUser));

          sessions
              .filter(session => !!session.speakers)
              .forEach(session => {
                session.speakers
                       .filter(speaker => !!speaker.id)
                       .forEach(speaker => {
                         Object.assign(speaker, speakers.find(s => s.id === speaker.id));
                       });
              });

          this.sessionsStream.next(sessions);
        });
  }

  private transformToUser(rawUser: any): Speaker {
    return {
      id: rawUser.uid,
      name: rawUser.field_register_name,
      nickname: rawUser.name,
      avatar: rawUser.uri || 'assets/images/avatar.svg'
    }
  }

  private transformToSession(rawSession: RawSession): Session {
    const session = new Session();

    const startEndTime = rawSession.field_start_end_period.split(' - ');
    session.startTime = startEndTime[0];
    session.endTime = startEndTime[1];
    session.type = rawSession.field_session_type || rawSession.type;
    session.id = rawSession.nid;

    if (rawSession.field_break_title) {
      session.name = rawSession.field_break_title;
      session.venue = rawSession.field_break_title;
    } else {
      session.name = rawSession.title;
      session.venue = rawSession.field_room;
      session.level = rawSession.field_session_level;
      session.target = Utils.toCamelCase(rawSession.field_session_track_type);

      if (rawSession.field_speaker_full_name) {
        const speaker = {
          name: rawSession.field_speaker_full_name,
          avatar: rawSession.uri || 'assets/images/avatar.svg'
        };
        session.speakers = [speaker];
      } else {
        rawSession.field_user_ref.forEach(userId => this.userIds.add(userId));
        session.speakers = rawSession.field_user_ref.map(userRef => ({ id: userRef, name: '', avatar: '' }));
      }
    }

    return session;
  }

  private addDetailsToSession(rawSession: RawSession, session: Session): Session {
    const result = new Session(session);

    result.speakers = session.speakers;
    result.description = rawSession.body;

    if (result.type === 'keynote') {
      result.speakers[0].position = rawSession.field_speaker_position;
      result.speakers[0].bio = rawSession.field_speaker_bio;
      result.companyName = rawSession.field_company_name;
      result.companyLogo = rawSession.company_logo;
      result.companyBio = rawSession.field_company_bio;
    }

    return result;
  }
}
