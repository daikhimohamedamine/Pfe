import { Employe } from './employe.model';

export interface Rappel {
  id?: number;
  type: string;
  date: string;
  status: string;
  employe?: Employe;
}
