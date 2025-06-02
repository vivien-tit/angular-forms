import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './test.component.html',
})
export class TestComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    const formData = this.form.value;
    this.http.post('http://localhost:8080/api/convention/generate', formData, {
      responseType: 'blob'
    }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'convention.docx';
      link.click();
    });
  }
}