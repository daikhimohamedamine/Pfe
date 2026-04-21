import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActeService } from '../services/acte.service';
import { EmployeService } from '../services/employe.service';
import { Employe } from '../models/employe.model';

@Component({
  selector: 'app-acte-form',
  templateUrl: './acte-form.component.html',
  styleUrls: ['./acte-form.component.scss']
})
export class ActeFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  acteId?: number;
  loading = false;
  saving = false;
  employes: Employe[] = [];
  types = ['Vaccination', 'Prise de sang', 'Radiographie', 'Electrocardiogramme', 'Échographie', 'Chirurgie mineure', 'Suture', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private service: ActeService,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      employe: [null, Validators.required]
    });
    this.employeService.getAll().subscribe(data => this.employes = data);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true; this.acteId = +id; this.loading = true;
      this.service.getById(this.acteId).subscribe({ next: (d) => { this.form.patchValue(d); this.loading = false; }, error: () => this.loading = false });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEdit && this.acteId ? this.service.update(this.acteId, this.form.value) : this.service.create(this.form.value);
    op.subscribe({
      next: () => { this.snackBar.open(this.isEdit ? 'Acte modifié' : 'Acte créé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.router.navigate(['/actes']); },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/actes']); }
}
