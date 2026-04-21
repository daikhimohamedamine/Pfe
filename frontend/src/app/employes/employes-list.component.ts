import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employe } from '../models/employe.model';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-employes-list',
  templateUrl: './employes-list.component.html',
  styleUrls: ['./employes-list.component.scss']
})
export class EmployesListComponent implements OnInit {
  displayedColumns = ['nom', 'prenom', 'dateNaissance', 'posteTravail', 'dateEmbauche', 'vaccination', 'actions'];
  dataSource = new MatTableDataSource<Employe>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeService: EmployeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.employeService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des employés', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' });
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  navigateToNew(): void {
    this.router.navigate(['/employes/nouveau']);
  }

  navigateToEdit(id: number | undefined): void {
    if (id) this.router.navigate([`/employes/${id}/modifier`]);
  }

  navigateToDossier(id: number | undefined): void {
    if (id) this.router.navigate([`/dossiers/${id}`]);
  }

  delete(id: number | undefined): void {
    if (!id) return;
    if (confirm('Confirmer la suppression de cet employé ?')) {
      this.employeService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Employé supprimé avec succès', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
          this.loadData();
        },
        error: () => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' })
      });
    }
  }
}
