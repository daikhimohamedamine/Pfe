import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userName = '';
  role = '';
  sidenavOpened = true;

  navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', route: '/dashboard', roles: ['ADMIN', 'MEDECIN', 'COORDINATEUR'] },
    { label: 'Employés', icon: 'people', route: '/employes', roles: ['ADMIN', 'MEDECIN'] },
    { label: 'Médecins', icon: 'local_hospital', route: '/medecins', roles: ['ADMIN', 'MEDECIN', 'COORDINATEUR'] },
    { label: 'Consultations', icon: 'medical_services', route: '/consultations', roles: ['ADMIN', 'MEDECIN'] },
    { label: 'Actes Médicaux', icon: 'assignment', route: '/actes', roles: ['ADMIN', 'MEDECIN'] },
    { label: 'Examens', icon: 'biotech', route: '/examens', roles: ['ADMIN', 'MEDECIN'] },
    { label: 'Ordonnances', icon: 'description', route: '/ordonnances', roles: ['ADMIN', 'MEDECIN'] },
    { label: 'Rappels', icon: 'notifications', route: '/rappels', roles: ['ADMIN', 'COORDINATEUR'] },
    { label: 'Utilisateurs', icon: 'manage_accounts', route: '/utilisateurs', roles: ['ADMIN'] },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || '';
    this.role = this.authService.getRole() || '';
  }

  get visibleNavItems(): NavItem[] {
    return this.navItems.filter(item => item.roles.includes(this.role));
  }

  getRoleLabel(): string {
    switch (this.role) {
      case 'ADMIN': return 'Administrateur';
      case 'MEDECIN': return 'Médecin';
      case 'COORDINATEUR': return 'Coordinateur';
      default: return this.role;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
