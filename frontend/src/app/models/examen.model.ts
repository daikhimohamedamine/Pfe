import { Employe } from './employe.model';
import { Consultation } from './consultation.model';

export interface Examen {
  id?: number;
  typeExamens: string;
  resultats: string;
  employe?: Employe;
  consultation?: Consultation;
}
