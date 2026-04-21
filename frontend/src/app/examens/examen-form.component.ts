import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenService } from '../services/examen.service';
import { EmployeService } from '../services/employe.service';
import { ConsultationService } from '../services/consultation.service';
import { Employe } from '../models/employe.model';
import { Consultation } from '../models/consultation.model';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.scss']
})
export class ExamenFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  examenId?: number;
  loading = false;
  saving = false;
  employes: Employe[] = [];
  consultations: Consultation[] = [];
  types = ['Biologie', 'Radiologie', 'Échographie', 'Scanner', 'IRM', 'Électrocardiogramme', 'Endoscopie', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private service: ExamenService,
    private employeService: EmployeService,
    private consultationService: ConsultationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      typeExamens: ['', Validators.required],
      resultats: [''],
      employe: [null, Validators.required],
      consultation: [null]
    });
    this.employeService.getAll().subscribe(data => this.employes = data);
    this.consultationService.getAll().subscribe(data => this.consultations = data);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true; this.examenId = +id; this.loading = true;
      this.service.getById(this.examenId).subscribe({ next: (d) => { this.form.patchValue(d); this.loading = false; }, error: () => this.loading = false });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEdit && this.examenId ? this.service.update(this.examenId, this.form.value) : this.service.create(this.form.value);
    op.subscribe({
      next: () => { this.snackBar.open(this.isEdit ? 'Examen modifié' : 'Examen créé', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.router.navigate(['/examens']); },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/examens']); }
}
