export interface User {
  id?: number;
  userName: string;
  password?: string;
  role: 'ADMIN' | 'MEDECIN' | 'COORDINATEUR';
  enabled: boolean;
}
