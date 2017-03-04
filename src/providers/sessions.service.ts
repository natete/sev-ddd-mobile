import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Session } from './Session';

@Injectable()
export class SessionsService {

  private baseUrl = 'https://sev-ddd.firebaseio.com';

  constructor(private http: Http) {
    console.log('Hello SessionsService Provider');
  }

  getSessions(date: string): Observable<Session[]> {
    return this.http
               .get(`${this.baseUrl}/${date}.json`)
               .map(data => data.json().sessions as Session[]);
  }
}
