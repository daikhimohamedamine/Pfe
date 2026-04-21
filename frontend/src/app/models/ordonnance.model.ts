import { Consultation } from './consultation.model';

export interface Ordonnance {
  id?: number;
  type: string;
  date: string;
  medicaments: string;
  consultation?: Consultation;
}
