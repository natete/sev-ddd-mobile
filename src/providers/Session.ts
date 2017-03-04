import { Speaker } from './Speaker';

export interface Session {
  name: string;
  time: string;
  speakers?: Speaker[];
  level?: string;
  target?: string;
  type?: string;
  description?: string;
  venue?: string;

}