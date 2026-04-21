import { User } from './user.model';

export interface Employe {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  posteTravail: string;
  dateEmbauche: string;
  vaccination: boolean;
  user?: User;
}
