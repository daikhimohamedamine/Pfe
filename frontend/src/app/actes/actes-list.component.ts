import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Acte } from '../models/acte.model';
import { ActeService } from '../services/acte.service';

@Component({
  selector: 'app-actes-list',
  templateUrl: './actes-list.component.html',
  styleUrls: ['./actes-list.component.scss']
})
export class ActesListComponent implements OnInit {
  displayedColumns = ['type', 'date', 'employe', 'actions'];
  dataSource = new MatTableDataSource<Acte>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ActeService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.dataSource.data = data; this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; this.loading = false; },
      error: () => this.loading = false
    });
  }

  applyFilter(event: Event): void { this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase(); }
  navigateToNew(): void { this.router.navigate(['/actes/nouveau']); }
  navigateToEdit(id: number | undefined): void { if (id) this.router.navigate([`/actes/${id}/modifier`]); }

  delete(id: number | undefined): void {
    if (!id || !confirm('Confirmer la suppression ?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.snackBar.open('Acte supprimé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.loadData(); },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }
}
