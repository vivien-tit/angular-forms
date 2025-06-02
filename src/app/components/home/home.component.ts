import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Etat de l'UI
  showUserMenu = false;
  showDocumentsMenu = true;
  currentSection = 'home';
  searchQuery = '';

  // Données mockées
  recentDocuments = [
    { id: 1, title: 'Contrat Client A', type: 'Contrat', date: new Date() },
    { id: 2, title: 'Facture Mai 2023', type: 'Facture', date: new Date('2023-05-01') }
  ];

  quickTemplates = [
    { id: 1, name: 'Contrat Standard', type: 'Contrat' },
    { id: 2, name: 'Facture Pro', type: 'Facture' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Méthodes Navigation
  navigateTo(section: string) {
    this.currentSection = section;
    this.router.navigate([section], { relativeTo: this.route });
  }

  goToHome() {
    this.navigateTo('home');
  }

  // Méthodes Documents
  createNewDocument() {
    this.router.navigate(['documents/new'], { relativeTo: this.route });
  }

  openDocument(doc: any) {
    console.log('Ouverture document:', doc);
  }

  regenerateDoc(event: Event, docId: number) {
    event.stopPropagation();
    console.log('Régénération document:', docId);
  }

  downloadDoc(event: Event, doc: any) {
    event.stopPropagation();
    console.log('Téléchargement document:', doc);
  }

  shareDoc(event: Event, doc: any) {
    event.stopPropagation();
    console.log('Partage document:', doc);
  }

  refreshDocs() {
    console.log('Rafraîchissement documents');
  }

  // Méthodes Templates
  useTemplate(template: any) {
    console.log('Utilisation template:', template);
  }

  getTemplateIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'Contrat': '📝',
      'Facture': '💰',
      'Lettre': '✉️'
    };
    return icons[type] || '📄';
  }

  // Méthodes Utilisateur
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  openProfile() {
    console.log('Ouverture profil');
    this.showUserMenu = false;
  }

  openSettings() {
    console.log('Ouverture paramètres');
    this.showUserMenu = false;
  }

  logout(): void {
    // Supprime les données de session (par exemple un token)
    localStorage.removeItem('currentUser');
    console.log('Déconnexion');

    // Redirige vers la page de connexion
    this.router.navigate(['/login']);
  }

  showHelp() {
    console.log('Affichage aide');
  }

  // Méthode Recherche
  onSearch() {
    console.log('Recherche:', this.searchQuery);
  }

  toggleDocumentsMenu() {
    this.showDocumentsMenu = !this.showDocumentsMenu;
  }
}