import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployesListComponent } from './employes/employes-list.component';
import { EmployeFormComponent } from './employes/employe-form.component';
import { MedecinsListComponent } from './medecins/medecins-list.component';
import { MedecinFormComponent } from './medecins/medecin-form.component';
import { DossierDetailComponent } from './dossiers/dossier-detail.component';
import { ConsultationsListComponent } from './consultations/consultations-list.component';
import { ConsultationFormComponent } from './consultations/consultation-form.component';
import { ActesListComponent } from './actes/actes-list.component';
import { ActeFormComponent } from './actes/acte-form.component';
import { ExamensListComponent } from './examens/examens-list.component';
import { ExamenFormComponent } from './examens/examen-form.component';
import { OrdonnancesListComponent } from './ordonnances/ordonnances-list.component';
import { OrdonnanceFormComponent } from './ordonnances/ordonnance-form.component';
import { RappelsListComponent } from './rappels/rappels-list.component';
import { RappelFormComponent } from './rappels/rappel-form.component';
import { UsersListComponent } from './users/users-list.component';
import { UserFormComponent } from './users/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    EmployesListComponent,
    EmployeFormComponent,
    MedecinsListComponent,
    MedecinFormComponent,
    DossierDetailComponent,
    ConsultationsListComponent,
    ConsultationFormComponent,
    ActesListComponent,
    ActeFormComponent,
    ExamensListComponent,
    ExamenFormComponent,
    OrdonnancesListComponent,
    OrdonnanceFormComponent,
    RappelsListComponent,
    RappelFormComponent,
    UsersListComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
