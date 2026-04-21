import { Employe } from './employe.model';
import { Medecin } from './medecin.model';

export interface Consultation {
  id?: number;
  date: string;
  type: string;
  motif: string;
  observations: string;
  examen: string;
  employe?: Employe;
  medecin?: Medecin;
}
