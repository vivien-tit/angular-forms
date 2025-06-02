import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentsService } from '../../services/documents.service';
import { Modele } from '../../services/modele.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-contra-form',
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule, 
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule

  ],
  templateUrl: './contra-form.component.html',
  styleUrl: './contra-form.component.css'
})
export class ContraFormComponent {
form: FormGroup;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ContraFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modele: Modele },
    private fb: FormBuilder,
    private documentService: DocumentsService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  annuler(): void {
    this.dialogRef.close();
  }

  genererDocument(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const contenu = this.form.value;
    const utilisateurId = this.authService.getUtilisateurId();
    if (!utilisateurId) {
      alert("Utilisateur non connecté !");
      return;
    } // à remplacer par l'utilisateur connecté (ex: AuthService)
    const modeleId = this.data.modele.id;

    this.documentService.genererDocument({
      titre: this.data.modele.nom + '-' + Date.now(),
      type: 'Autre',
      contenu_json: contenu,
      utilisateur_id: utilisateurId,
      modele_id: modeleId,
      id: 0,
      date_creation: '',
      derniere_modif: ''
    }).subscribe({
      next: (response: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = 'document_' + Date.now() + '.docx';
        link.click();

        this.loading = false;
        this.dialogRef.close();
      },
      error: (err: any) => {
        console.error('Erreur lors de la génération', err);
        this.loading = false;
      }
    });
  }

}
