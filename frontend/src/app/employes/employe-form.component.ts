import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-employe-form',
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.scss']
})
export class EmployeFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  employeId?: number;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      dateNaissance: ['', Validators.required],
      posteTravail: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      vaccination: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.employeId = +id;
      this.loading = true;
      this.employeService.getById(this.employeId).subscribe({
        next: (data) => {
          this.form.patchValue(data);
          this.loading = false;
        },
        error: () => {
          this.snackBar.open('Erreur lors du chargement', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const value = this.form.value;

    const op = this.isEdit && this.employeId
      ? this.employeService.update(this.employeId, value)
      : this.employeService.create(value);

    op.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit ? 'Employé modifié avec succès' : 'Employé créé avec succès',
          'Fermer', { duration: 3000, panelClass: 'success-snackbar' }
        );
        this.router.navigate(['/employes']);
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' });
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employes']);
  }
}
