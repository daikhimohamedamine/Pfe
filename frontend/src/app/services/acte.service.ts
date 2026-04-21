import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acte } from '../models/acte.model';

@Injectable({ providedIn: 'root' })
export class ActeService {
  private readonly API = 'http://localhost:8080/api/actes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Acte[]> {
    return this.http.get<Acte[]>(this.API);
  }

  getById(id: number): Observable<Acte> {
    return this.http.get<Acte>(`${this.API}/${id}`);
  }

  getByEmployeId(employeId: number): Observable<Acte[]> {
    return this.http.get<Acte[]>(`${this.API}/employe/${employeId}`);
  }

  create(acte: Acte): Observable<Acte> {
    return this.http.post<Acte>(this.API, acte);
  }

  update(id: number, acte: Acte): Observable<Acte> {
    return this.http.put<Acte>(`${this.API}/${id}`, acte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
