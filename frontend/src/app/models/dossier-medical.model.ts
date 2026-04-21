import { Employe } from './employe.model';

export interface DossierMedical {
  id?: number;
  historique: string;
  antecedents: string;
  traitements: string;
  allergies: string;
  employe?: Employe;
}
