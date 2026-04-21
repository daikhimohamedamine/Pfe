import { User } from './user.model';

export interface Medecin {
  id?: number;
  nom: string;
  specialite: string;
  user?: User;
}
