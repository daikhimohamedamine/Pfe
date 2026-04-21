import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordonnance } from '../models/ordonnance.model';

@Injectable({ providedIn: 'root' })
export class OrdonnanceService {
  private readonly API = 'http://localhost:8080/api/ordonnances';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ordonnance[]> {
    return this.http.get<Ordonnance[]>(this.API);
  }

  getById(id: number): Observable<Ordonnance> {
    return this.http.get<Ordonnance>(`${this.API}/${id}`);
  }

  getByConsultationId(consultationId: number): Observable<Ordonnance[]> {
    return this.http.get<Ordonnance[]>(`${this.API}/consultation/${consultationId}`);
  }

  create(ordonnance: Ordonnance): Observable<Ordonnance> {
    return this.http.post<Ordonnance>(this.API, ordonnance);
  }

  update(id: number, ordonnance: Ordonnance): Observable<Ordonnance> {
    return this.http.put<Ordonnance>(`${this.API}/${id}`, ordonnance);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
