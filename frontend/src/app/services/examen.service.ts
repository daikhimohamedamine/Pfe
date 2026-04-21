import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examen } from '../models/examen.model';

@Injectable({ providedIn: 'root' })
export class ExamenService {
  private readonly API = 'http://localhost:8080/api/examens';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.API);
  }

  getById(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${this.API}/${id}`);
  }

  getByEmployeId(employeId: number): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.API}/employe/${employeId}`);
  }

  getByConsultationId(consultationId: number): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.API}/consultation/${consultationId}`);
  }

  create(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.API, examen);
  }

  update(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.API}/${id}`, examen);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
