import { Employe } from './employe.model';

export interface Acte {
  id?: number;
  type: string;
  date: string;
  employe?: Employe;
}
