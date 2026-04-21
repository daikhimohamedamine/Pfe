import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardStats } from '../services/dashboard.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalEmployes: 0,
    totalMedecins: 0,
    totalConsultations: 0,
    totalActes: 0,
    totalExamens: 0,
    totalOrdonnances: 0,
    totalRappels: 0,
    rappelsPending: 0
  };
  loading = true;
  role = '';

  statCards = [
    { key: 'totalEmployes', label: 'Employés', icon: 'people', color: '#1976D2', route: '/employes', roles: ['ADMIN', 'MEDECIN'] },
    { key: 'totalMedecins', label: 'Médecins', icon: 'local_hospital', color: '#388E3C', route: '/medecins', roles: ['ADMIN', 'MEDECIN', 'COORDINATEUR'] },
    { key: 'totalConsultations', label: 'Consultations', icon: 'medical_services', color: '#7B1FA2', route: '/consultations', roles: ['ADMIN', 'MEDECIN'] },
    { key: 'totalActes', label: 'Actes Médicaux', icon: 'assignment', color: '#F57C00', route: '/actes', roles: ['ADMIN', 'MEDECIN'] },
    { key: 'totalExamens', label: 'Examens', icon: 'biotech', color: '#0097A7', route: '/examens', roles: ['ADMIN', 'MEDECIN'] },
    { key: 'totalOrdonnances', label: 'Ordonnances', icon: 'description', color: '#C62828', route: '/ordonnances', roles: ['ADMIN', 'MEDECIN'] },
    { key: 'totalRappels', label: 'Rappels', icon: 'notifications', color: '#5D4037', route: '/rappels', roles: ['ADMIN', 'COORDINATEUR'] },
  ];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole() || '';
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get visibleCards() {
    return this.statCards.filter(c => c.roles.includes(this.role));
  }

  getStatValue(key: string): number {
    return (this.stats as unknown as Record<string, number>)[key] ?? 0;
  }
}
