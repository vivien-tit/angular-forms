import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-convention-form',
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './convention-form.component.html',
  styleUrl: './convention-form.component.css'
})
export class ConventionFormComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ConventionFormComponent>
  ) {
    this.form = this.fb.group({
      reference: [''], villeconge: [''], villeperm: [''], dateSaisie: [''],
      nom: [''], fonction: [''], unite: [''], matricule: [''],
      NomClient: [''], Telephone: [''], Adresse: [''], Email: [''],
      NomOrganisme: [''], AdresseEmprunteur: [''], TelephoneEmprunteur: [''], EmailEmprunteur: [''],
      usagePret: [''], montantPret: [''], tauxInteret: [''], dureePret: [''],
      montantEcheance: [''], nombreEcheance: [''], ville: [''], date: ['']
    });
  }

  onSubmit() {
    this.isLoading = true;
    const formData = this.form.value;

    this.http.post('http://localhost:8080/api/convention/generate', formData, {
      responseType: 'blob'
    }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'convention.docx';
      link.click();

      this.isLoading = false;
      this.dialogRef.close(true); // ✅ succès
    }, error => {
      console.error('Erreur:', error);
      this.isLoading = false;
      this.dialogRef.close(false); // ❌ échec
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
