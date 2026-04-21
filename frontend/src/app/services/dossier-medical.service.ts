import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DossierMedical } from '../models/dossier-medical.model';

@Injectable({ providedIn: 'root' })
export class DossierMedicalService {
  private readonly API = 'http://localhost:8080/api/dossiers';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<DossierMedical> {
    return this.http.get<DossierMedical>(`${this.API}/${id}`);
  }

  getByEmployeId(employeId: number): Observable<DossierMedical> {
    return this.http.get<DossierMedical>(`${this.API}/employe/${employeId}`);
  }

  update(id: number, dossier: DossierMedical): Observable<DossierMedical> {
    return this.http.put<DossierMedical>(`${this.API}/${id}`, dossier);
  }
}
