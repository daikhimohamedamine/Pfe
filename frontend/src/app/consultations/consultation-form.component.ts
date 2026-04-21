import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultationService } from '../services/consultation.service';
import { EmployeService } from '../services/employe.service';
import { MedecinService } from '../services/medecin.service';
import { Employe } from '../models/employe.model';
import { Medecin } from '../models/medecin.model';

@Component({
  selector: 'app-consultation-form',
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.scss']
})
export class ConsultationFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  consultationId?: number;
  loading = false;
  saving = false;
  employes: Employe[] = [];
  medecins: Medecin[] = [];
  types = ['Consultation générale', 'Urgence', 'Suivi', 'Préventive', 'Spécialisée'];

  constructor(
    private fb: FormBuilder,
    private service: ConsultationService,
    private employeService: EmployeService,
    private medecinService: MedecinService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      motif: ['', Validators.required],
      observations: [''],
      examen: [''],
      employe: [null, Validators.required],
      medecin: [null, Validators.required]
    });

    this.employeService.getAll().subscribe(data => this.employes = data);
    this.medecinService.getAll().subscribe(data => this.medecins = data);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.consultationId = +id;
      this.loading = true;
      this.service.getById(this.consultationId).subscribe({
        next: (data) => { this.form.patchValue(data); this.loading = false; },
        error: () => this.loading = false
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEdit && this.consultationId
      ? this.service.update(this.consultationId, this.form.value)
      : this.service.create(this.form.value);
    op.subscribe({
      next: () => {
        this.snackBar.open(this.isEdit ? 'Consultation modifiée' : 'Consultation créée', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
        this.router.navigate(['/consultations']);
      },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/consultations']); }
}
