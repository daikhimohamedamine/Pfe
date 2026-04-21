import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.model';

@Injectable({ providedIn: 'root' })
export class EmployeService {
  private readonly API = 'http://localhost:8080/api/employes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.API);
  }

  getById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.API}/${id}`);
  }

  create(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(this.API, employe);
  }

  update(id: number, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.API}/${id}`, employe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
