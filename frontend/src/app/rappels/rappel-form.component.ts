import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RappelService } from '../services/rappel.service';
import { EmployeService } from '../services/employe.service';
import { Employe } from '../models/employe.model';

@Component({
  selector: 'app-rappel-form',
  templateUrl: './rappel-form.component.html',
  styleUrls: ['./rappel-form.component.scss']
})
export class RappelFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  rappelId?: number;
  loading = false;
  saving = false;
  employes: Employe[] = [];
  types = ['Vaccination', 'Visite médicale', 'Contrôle', 'Prise de médicament', 'Rendez-vous', 'Autre'];
  statuts = ['PENDING', 'DONE', 'CANCELLED'];

  constructor(
    private fb: FormBuilder,
    private service: RappelService,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      status: ['PENDING', Validators.required],
      employe: [null, Validators.required]
    });
    this.employeService.getAll().subscribe(data => this.employes = data);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true; this.rappelId = +id; this.loading = true;
      this.service.getById(this.rappelId).subscribe({ next: (d) => { this.form.patchValue(d); this.loading = false; }, error: () => this.loading = false });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEdit && this.rappelId ? this.service.update(this.rappelId, this.form.value) : this.service.create(this.form.value);
    op.subscribe({
      next: () => { this.snackBar.open(this.isEdit ? 'Rappel modifié' : 'Rappel créé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.router.navigate(['/rappels']); },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/rappels']); }
}
