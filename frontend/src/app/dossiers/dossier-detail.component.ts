import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DossierMedical } from '../models/dossier-medical.model';
import { Consultation } from '../models/consultation.model';
import { DossierMedicalService } from '../services/dossier-medical.service';
import { ConsultationService } from '../services/consultation.service';
import { EmployeService } from '../services/employe.service';
import { Employe } from '../models/employe.model';

@Component({
  selector: 'app-dossier-detail',
  templateUrl: './dossier-detail.component.html',
  styleUrls: ['./dossier-detail.component.scss']
})
export class DossierDetailComponent implements OnInit {
  dossier?: DossierMedical;
  employe?: Employe;
  consultations: Consultation[] = [];
  form!: FormGroup;
  loading = true;
  saving = false;
  employeId!: number;
  editMode = false;
  consultationColumns = ['date', 'type', 'motif', 'medecin'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dossierService: DossierMedicalService,
    private consultationService: ConsultationService,
    private employeService: EmployeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employeId = +this.route.snapshot.paramMap.get('employeId')!;
    this.form = this.fb.group({
      historique: [''],
      antecedents: [''],
      traitements: [''],
      allergies: ['']
    });

    this.employeService.getById(this.employeId).subscribe(emp => this.employe = emp);

    this.dossierService.getByEmployeId(this.employeId).subscribe({
      next: (d) => {
        this.dossier = d;
        this.form.patchValue(d);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });

    this.consultationService.getByEmployeId(this.employeId).subscribe({
      next: (data) => this.consultations = data,
      error: () => {}
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode && this.dossier) this.form.patchValue(this.dossier);
  }

  save(): void {
    if (!this.dossier?.id) return;
    this.saving = true;
    this.dossierService.update(this.dossier.id, { ...this.dossier, ...this.form.value }).subscribe({
      next: (d) => {
        this.dossier = d;
        this.editMode = false;
        this.saving = false;
        this.snackBar.open('Dossier mis à jour', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
      },
      error: () => { this.saving = false; this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); }
    });
  }
}
