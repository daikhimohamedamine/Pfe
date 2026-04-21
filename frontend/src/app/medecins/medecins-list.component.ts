import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Medecin } from '../models/medecin.model';
import { MedecinService } from '../services/medecin.service';

@Component({
  selector: 'app-medecins-list',
  templateUrl: './medecins-list.component.html',
  styleUrls: ['./medecins-list.component.scss']
})
export class MedecinsListComponent implements OnInit {
  displayedColumns = ['nom', 'specialite', 'actions'];
  dataSource = new MatTableDataSource<Medecin>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private medecinService: MedecinService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.medecinService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  navigateToNew(): void { this.router.navigate(['/medecins/nouveau']); }

  navigateToEdit(id: number | undefined): void {
    if (id) this.router.navigate([`/medecins/${id}/modifier`]);
  }

  delete(id: number | undefined): void {
    if (!id) return;
    if (confirm('Confirmer la suppression ?')) {
      this.medecinService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Médecin supprimé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
          this.loadData();
        },
        error: () => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' })
      });
    }
  }
}
