import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rappel } from '../models/rappel.model';

@Injectable({ providedIn: 'root' })
export class RappelService {
  private readonly API = 'http://localhost:8080/api/rappels';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rappel[]> {
    return this.http.get<Rappel[]>(this.API);
  }

  getById(id: number): Observable<Rappel> {
    return this.http.get<Rappel>(`${this.API}/${id}`);
  }

  getByEmployeId(employeId: number): Observable<Rappel[]> {
    return this.http.get<Rappel[]>(`${this.API}/employe/${employeId}`);
  }

  getByStatus(status: string): Observable<Rappel[]> {
    return this.http.get<Rappel[]>(`${this.API}/status/${status}`);
  }

  create(rappel: Rappel): Observable<Rappel> {
    return this.http.post<Rappel>(this.API, rappel);
  }

  update(id: number, rappel: Rappel): Observable<Rappel> {
    return this.http.put<Rappel>(`${this.API}/${id}`, rappel);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
