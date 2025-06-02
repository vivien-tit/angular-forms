import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-convention-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './convention-form.component.html',
  styleUrls: ['./convention-form.component.css']
})
export class ConventionFormComponent {
  form: FormGroup;

  formFieldsLeft = [
  { key: 'reference', label: 'Référence' },
  { key: 'villeconge', label: 'Ville Congé' },
  { key: 'villeperm', label: 'Ville Perm' },
  { key: 'dateSaisie', label: 'Date Saisie' },
  { key: 'nom', label: 'Nom' },
  { key: 'fonction', label: 'Fonction' },
  { key: 'unite', label: 'Unité' },
  { key: 'matricule', label: 'Matricule' },
  { key: 'NomClient', label: 'Nom Client' },
  { key: 'Telephone', label: 'Téléphone' },
  { key: 'Adresse', label: 'Adresse' },
  { key: 'Email', label: 'Email' }
];

formFieldsRight = [
  { key: 'NomOrganisme', label: 'Nom de l’organisme prêteur ou société' },
  { key: 'AdresseEmprunteur', label: 'Adresse Emprunteur' },
  { key: 'TelephoneEmprunteur', label: 'Téléphone Emprunteur' },
  { key: 'EmailEmprunteur', label: 'Email Emprunteur' },
  { key: 'usagePret', label: 'Motif du prêt' },
  { key: 'montantPret', label: 'Montant du prêt' },
  { key: 'tauxInteret', label: 'Taux d’intérêt annuel (%)' },
  { key: 'dureePret', label: 'Durée du prêt (mois)' },
  { key: 'montantEcheance', label: 'Montant de chaque échéance' },
  { key: 'nombreEcheance', label: 'Nombre d’échéances' },
  { key: 'ville', label: 'Ville' },
  { key: 'date', label: 'Date' }
];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      reference: ['REF-2025-001', Validators.required],
      villeconge: ['Yaoundé'],
      villeperm: ['Douala'],
      dateSaisie: ['12 mai 2025'],

      nom: ['Jean Dupont'],
      fonction: ['Responsable Financier'],
      unite: ['Département Crédit'],
      matricule: ['001245'],

      NomClient: ['vivien'],
      Telephone: ['651493949'],
      Adresse: ['Yaoundé'],
      Email: ['vtitsop4@gmail.com'],

      NomOrganisme: ['Afriland First Bank'],
      AdresseEmprunteur: ['Douala'],
      TelephoneEmprunteur: ['651493949'],
      EmailEmprunteur: ['vtitsop4@gmail.com'],

      usagePret: ["l'investissement dans l'immobilier"],
      montantPret: ['100000000'],
      tauxInteret: ['8'],
      dureePret: ['12'],
      montantEcheance: ['9000000'],
      nombreEcheance: ['12'],

      ville: ['yaoundé'],
      date: ['15 mai 2025']
    });
  }

  onSubmit() {
    console.log(this.form.value); // à envoyer à ton backend
  }
}
