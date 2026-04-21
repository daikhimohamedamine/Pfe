import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedecinService } from '../services/medecin.service';

@Component({
  selector: 'app-medecin-form',
  templateUrl: './medecin-form.component.html',
  styleUrls: ['./medecin-form.component.scss']
})
export class MedecinFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  medecinId?: number;
  loading = false;
  saving = false;

  specialites = ['Généraliste', 'Cardiologie', 'Dermatologie', 'Neurologie', 'Pédiatrie', 'Chirurgie', 'Psychiatrie', 'Gynécologie', 'Orthopédie', 'Ophtalmologie', 'ORL', 'Radiologie', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      specialite: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.medecinId = +id;
      this.loading = true;
      this.medecinService.getById(this.medecinId).subscribe({
        next: (data) => { this.form.patchValue(data); this.loading = false; },
        error: () => this.loading = false
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEdit && this.medecinId
      ? this.medecinService.update(this.medecinId, this.form.value)
      : this.medecinService.create(this.form.value);
    op.subscribe({
      next: () => {
        this.snackBar.open(this.isEdit ? 'Médecin modifié' : 'Médecin créé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
        this.router.navigate(['/medecins']);
      },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/medecins']); }
}
