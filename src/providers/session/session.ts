import { Speaker } from './speaker';
import { Utils } from '../../shared/utils';

export class Session {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  speakers?: Speaker[];
  speakerBio?: string;
  speakerPosition?: string;
  companyName?: string;
  companyLogo?: string;
  companyBio?: string;
  level?: string;
  target?: string;
  type?: string;
  description?: string;
  venue?: string;

  constructor(session: any = {}) {
    this.id = session.id;
    this.name = session.name;
    this.startTime = session.startTime;
    this.endTime = session.endTime;
    this.speakers = session.speakers;
    this.speakerBio = session.speakerBio;
    this.speakerPosition = session.speakerPosition;
    this.companyName = session.companyName;
    this.companyLogo = session.companyLogo;
    this.companyBio = session.companyBio;
    this.level = session.level;
    this.target = Utils.toCamelCase(session.target);
    this.type = session.type;
    this.description = session.description;
    this.venue = session.venue;
  }

  getSessionNotes() {
    return `Type: ${this.type}
    Level: ${this.level}
    Target: ${this.target}
    Speakers: ${this.getSpeakers()}
    
    ${String(this.description)
      .replace(/<[^>]+>/gm, '')}
`
  }

  private getSpeakers(): string {
    if (!this.speakers) {
      return '';
    } else {
      return this.speakers.map(speaker => speaker.name).join(', ');
    }
  }
}