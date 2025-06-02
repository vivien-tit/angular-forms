import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents-list',
  imports: [
    CommonModule
  ],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  documents: any[] = [];
  utilisateurId: number | null = null;

  constructor(private documentsService: DocumentsService, private authService: AuthService) {}


  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    const utilisateurId = this.authService.getUtilisateurId();
    if (utilisateurId !== null) {
      this.documentsService.getByUtilisateur(utilisateurId).subscribe({
        next: (docs) => {
          this.documents = docs;
          console.log('Documents reçus :', docs);
        },
        error: (err) => console.error('Erreur lors du chargement des documents :', err)
      });
    }
  }

  deleteDocument(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce document ?')) {
      this.documentsService.delete(id).subscribe(() => {
        this.ngOnInit(); // recharge la liste après suppression
      });
    }
  }
  // Pour la création ou la modification, vous pouvez ouvrir un formulaire dans un Dialog Angular Material
}
