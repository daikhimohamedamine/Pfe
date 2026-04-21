import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  userId?: number;
  loading = false;
  saving = false;
  hidePassword = true;
  roles = ['ADMIN', 'MEDECIN', 'COORDINATEUR'];

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', this.isEdit ? [] : [Validators.required, Validators.minLength(6)]],
      role: ['MEDECIN', Validators.required],
      enabled: [true]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userId = +id;
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
      this.loading = true;
      this.service.getById(this.userId).subscribe({
        next: (d) => { this.form.patchValue(d); this.loading = false; },
        error: () => this.loading = false
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const value = { ...this.form.value };
    if (this.isEdit && !value.password) delete value.password;
    const op = this.isEdit && this.userId ? this.service.update(this.userId, value) : this.service.create(value);
    op.subscribe({
      next: () => {
        this.snackBar.open(this.isEdit ? 'Utilisateur modifié' : 'Utilisateur créé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
        this.router.navigate(['/utilisateurs']);
      },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/utilisateurs']); }
}
