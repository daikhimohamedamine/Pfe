import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employes', component: EmployesListComponent },
      { path: 'employes/nouveau', component: EmployeFormComponent },
      { path: 'employes/:id/modifier', component: EmployeFormComponent },
      { path: 'medecins', component: MedecinsListComponent },
      { path: 'medecins/nouveau', component: MedecinFormComponent },
      { path: 'medecins/:id/modifier', component: MedecinFormComponent },
      { path: 'dossiers/:employeId', component: DossierDetailComponent },
      { path: 'consultations', component: ConsultationsListComponent },
      { path: 'consultations/nouveau', component: ConsultationFormComponent },
      { path: 'consultations/:id/modifier', component: ConsultationFormComponent },
      { path: 'actes', component: ActesListComponent },
      { path: 'actes/nouveau', component: ActeFormComponent },
      { path: 'actes/:id/modifier', component: ActeFormComponent },
      { path: 'examens', component: ExamensListComponent },
      { path: 'examens/nouveau', component: ExamenFormComponent },
      { path: 'examens/:id/modifier', component: ExamenFormComponent },
      { path: 'ordonnances', component: OrdonnancesListComponent },
      { path: 'ordonnances/nouveau', component: OrdonnanceFormComponent },
      { path: 'ordonnances/:id/modifier', component: OrdonnanceFormComponent },
      { path: 'rappels', component: RappelsListComponent },
      { path: 'rappels/nouveau', component: RappelFormComponent },
      { path: 'rappels/:id/modifier', component: RappelFormComponent },
      { path: 'utilisateurs', component: UsersListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'utilisateurs/nouveau', component: UserFormComponent },
      { path: 'utilisateurs/:id/modifier', component: UserFormComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
