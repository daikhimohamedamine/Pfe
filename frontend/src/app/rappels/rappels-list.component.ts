import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rappel } from '../models/rappel.model';
import { RappelService } from '../services/rappel.service';

@Component({
  selector: 'app-rappels-list',
  templateUrl: './rappels-list.component.html',
  styleUrls: ['./rappels-list.component.scss']
})
export class RappelsListComponent implements OnInit {
  displayedColumns = ['type', 'date', 'status', 'employe', 'actions'];
  dataSource = new MatTableDataSource<Rappel>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: RappelService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.dataSource.data = data; this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; this.loading = false; },
      error: () => this.loading = false
    });
  }

  applyFilter(event: Event): void { this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase(); }
  navigateToNew(): void { this.router.navigate(['/rappels/nouveau']); }
  navigateToEdit(id: number | undefined): void { if (id) this.router.navigate([`/rappels/${id}/modifier`]); }

  delete(id: number | undefined): void {
    if (!id || !confirm('Confirmer la suppression ?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.snackBar.open('Rappel supprimé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.loadData(); },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'DONE': return 'chip-active';
      case 'PENDING': return 'chip-inactive';
      default: return '';
    }
  }
}
