import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
// Données mockées
  recentDocuments = [
    { id: 1, title: 'Contrat Client jean', type: 'Contrat', date: new Date() },
    { id: 2, title: 'Facture doc 02', type: 'Facture', date: new Date('2025-05-01') }
  ];

  quickTemplates = [
    { id: 1, name: 'Contrat Standard', type: 'Contrat' },
    { id: 2, name: 'Facture Pro', type: 'Facture' }
  ];

  openDocument(doc: any) {
    console.log('Ouverture document:', doc);
  }

  regenerateDoc(event: Event, docId: number) {
    event.stopPropagation();
    console.log('Régénération document:', docId);
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

}
