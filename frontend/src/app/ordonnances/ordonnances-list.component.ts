import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ordonnance } from '../models/ordonnance.model';
import { OrdonnanceService } from '../services/ordonnance.service';

@Component({
  selector: 'app-ordonnances-list',
  templateUrl: './ordonnances-list.component.html',
  styleUrls: ['./ordonnances-list.component.scss']
})
export class OrdonnancesListComponent implements OnInit {
  displayedColumns = ['date', 'type', 'medicaments', 'consultation', 'actions'];
  dataSource = new MatTableDataSource<Ordonnance>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: OrdonnanceService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.dataSource.data = data; this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; this.loading = false; },
      error: () => this.loading = false
    });
  }

  applyFilter(event: Event): void { this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase(); }
  navigateToNew(): void { this.router.navigate(['/ordonnances/nouveau']); }
  navigateToEdit(id: number | undefined): void { if (id) this.router.navigate([`/ordonnances/${id}/modifier`]); }

  delete(id: number | undefined): void {
    if (!id || !confirm('Confirmer la suppression ?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.snackBar.open('Ordonnance supprimée', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.loadData(); },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }
}
