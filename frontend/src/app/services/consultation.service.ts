import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private readonly API = 'http://localhost:8080/api/consultations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.API);
  }

  getById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.API}/${id}`);
  }

  getByEmployeId(employeId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.API}/employe/${employeId}`);
  }

  getByMedecinId(medecinId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.API}/medecin/${medecinId}`);
  }

  create(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(this.API, consultation);
  }

  update(id: number, consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.API}/${id}`, consultation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
