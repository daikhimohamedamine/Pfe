import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Consultation } from '../models/consultation.model';
import { ConsultationService } from '../services/consultation.service';

@Component({
  selector: 'app-consultations-list',
  templateUrl: './consultations-list.component.html',
  styleUrls: ['./consultations-list.component.scss']
})
export class ConsultationsListComponent implements OnInit {
  displayedColumns = ['date', 'type', 'motif', 'employe', 'medecin', 'actions'];
  dataSource = new MatTableDataSource<Consultation>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ConsultationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  navigateToNew(): void { this.router.navigate(['/consultations/nouveau']); }
  navigateToEdit(id: number | undefined): void { if (id) this.router.navigate([`/consultations/${id}/modifier`]); }

  delete(id: number | undefined): void {
    if (!id || !confirm('Confirmer la suppression ?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.snackBar.open('Consultation supprimée', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.loadData(); },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }
}
