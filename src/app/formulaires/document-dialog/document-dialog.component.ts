import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentsService } from '../../services/documents.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-document-dialog',
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.css']
})
export class DocumentDialogComponent {

  form: FormGroup;
  titre: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: string },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    private documentsService: DocumentsService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      client: ['', Validators.required],
      date: ['', Validators.required],
      montant: [null, Validators.required],
      tva: [20]
    });
    this.titre = `${data.type} pour ${new Date().toLocaleDateString()}`;
  }

  soumettre() {
    const contenu_json = this.form.value;
    const document = {
      titre: this.titre,
      type: this.data.type,
      contenu_json: contenu_json,
      utilisateur_id: this.authService.getUtilisateurId(),
      modele_id: null
    };

    this.documentsService.creerDocument(document).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
