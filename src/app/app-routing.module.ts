import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentsCreateComponent } from './components/documents-create/documents-create.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { FavorisListComponent } from './components/favoris-list/favoris-list.component';
import { HistoriqueListComponent } from './components/historique-list/historique-list.component';
import { ModelesListComponent } from './components/modeles-list/modeles-list.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, children: [
    { path: 'dash', component: DashboardComponent },
    { path: 'my-documents', component: DocumentsListComponent },
    { path: 'documents/new', component: DocumentsCreateComponent },
    { path: 'templates', component: ModelesListComponent },
    { path: 'history', component: HistoriqueListComponent },
    { path: 'favorites', component: FavorisListComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'profile', component: ProfilComponent },
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accueil', component: AccueilComponent }, 
  { path: 'header', component: HeaderComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
