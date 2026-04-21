import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdonnanceService } from '../services/ordonnance.service';
import { ConsultationService } from '../services/consultation.service';
import { Consultation } from '../models/consultation.model';

@Component({
  selector: 'app-ordonnance-form',
  templateUrl: './ordonnance-form.component.html',
  styleUrls: ['./ordonnance-form.component.scss']
})
export class OrdonnanceFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  ordonnanceId?: number;
  loading = false;
  saving = false;
  consultations: Consultation[] = [];
  types = ['Traitement court terme', 'Traitement long terme', 'Antibiotique', 'Antidouleur', 'Préventif', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private service: OrdonnanceService,
    private consultationService: ConsultationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      medicaments: ['', Validators.required],
      consultation: [null, Validators.required]
    });
    this.consultationService.getAll().subscribe(data => this.consultations = data);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true; this.ordonnanceId = +id; this.loading = true;
      this.service.getById(this.ordonnanceId).subscribe({ next: (d) => { this.form.patchValue(d); this.loading = false; }, error: () => this.loading = false });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEdit && this.ordonnanceId ? this.service.update(this.ordonnanceId, this.form.value) : this.service.create(this.form.value);
    op.subscribe({
      next: () => { this.snackBar.open(this.isEdit ? 'Ordonnance modifiée' : 'Ordonnance créée', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' }); this.router.navigate(['/ordonnances']); },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' }); this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/ordonnances']); }
}
