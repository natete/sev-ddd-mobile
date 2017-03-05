import { Speaker } from './speaker';

export class Session {
  name: string;
  startTime: string;
  endTime: string;
  speakers?: Speaker[];
  level?: string;
  target?: string;
  type?: string;
  description?: string;
  venue?: string;

  constructor(session: any) {
    this.name = session.name;
    this.startTime = session.startTime;
    this.endTime = session.endTime;
    this.speakers = session.speakers;
    this.level = session.level;
    this.target = session.target;
    this.type = session.type;
    this.description = session.description;
    this.venue = session.venue;
  }

  getSessionNotes() {
    return `Type: ${this.type}
    Level: ${this.level}
    Target: ${this.target}
    Speakers: ${this.getSpeakers()}
    
    ${this.description}
`
  }

  private getSpeakers(): string {
    if (!this.speakers) {
      return '';
    } else {
      return this.speakers
                 .map(speaker => speaker.name)
                 .join(', ');
    }
  }
}