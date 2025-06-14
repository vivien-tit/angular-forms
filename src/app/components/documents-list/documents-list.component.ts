import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  @Input() document: any = null; // utilisé en modification
  form!: FormGroup;
  isEditMode: boolean = false;
  documents: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDocuments();
    this.isEditMode = this.document !== null;
    this.initForm();

    if (this.document?.contenuJson) {
      const contenu = JSON.parse(this.document.contenuJson);
      this.form.patchValue(contenu);
      console.log('document recu', this.documents);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      titre: [this.document?.titre || '', Validators.required],
      type: [this.document?.type || '', Validators.required],
      utilisateurId: [this.document?.utilisateur?.id || '', Validators.required],
      modeleId: [this.document?.modele?.id || '', Validators.required],

      reference: [''],
      villeconge: [''],
      villeperm: [''],
      dateSaisie: [''],
      nom: [''],
      fonction: [''],
      unite: [''],
      matricule: [''],
      NomClient: [''],
      Telephone: [''],
      Adresse: [''],
      Email: [''],
      NomOrganisme: [''],
      AdresseEmprunteur: [''],
      TelephoneEmprunteur: [''],
      EmailEmprunteur: [''],
      usagePret: [''],
      montantPret: [0],
      tauxInteret: [0],
      dureePret: [0],
      montantEcheance: [0],
      nombreEcheance: [0],
      ville: [''],
      date: ['']
    });
  }

  cancelEdit() {
  this.isEditMode = false;
  this.form.reset();
}

  onRegenerate(): void {
    const contenu = this.form.value;
    this.generateDocument(contenu);
  }

  generateDocument(data: any) {
    this.http.post('http://localhost:8080/api/convention/generate', data, {
      responseType: 'blob'
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'convention.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur de génération du document :', err);
        alert("La génération du document a échoué.");
      }
    });
  }

    onRegenerateFromJson(doc: any): void {
    if (!doc.contenuJson) {
      alert("Aucune donnée disponible pour générer ce document.");
      return;
    }
    const contenu = JSON.parse(doc.contenuJson);
    this.generateDocument(contenu);
  }


  loadDocuments(): void {
    this.http.get<any[]>('http://localhost:8080/api/documents')
      .subscribe(data => this.documents = data);
  }

  onCreate(): void {
    this.isEditMode = true;
    this.document = null;
    this.initForm();
  }

  onEdit(doc: any): void {
    this.document = doc;
    this.isEditMode = true;
    this.initForm();
    if (doc.contenuJson) {
      this.form.patchValue(JSON.parse(doc.contenuJson));
    }
  }

onDelete(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer ce document ?')) {
    this.http.delete(`http://localhost:8080/api/documents/${id}`,  { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response);
        this.documents = this.documents.filter(doc => doc.id !== id);
        this.loadDocuments();
        
      },
      error: (error) => {
        console.error('Erreur suppression :', error);
        this.loadDocuments(); // Recharger la liste des documents
        if (error.status === 404) {
          console.log("Le document n'existe pas ou a déjà été supprimé.");
        } else if (error.status === 409) {
          console.log("Impossible de supprimer : le document est lié à d'autres données.");
          this.loadDocuments(); // Recharger la liste des documents
        } else {
          console.log("Erreur lors de la suppression du document.");
        }
      }
    });
  }
}

onSubmit(): void {
  if (this.form.invalid) return;

  const contenuJson = JSON.stringify(this.form.value);
  const payload = {
    titre: this.form.value.titre,
    type: this.form.value.type,
    contenuJson,
    utilisateur: { id: this.form.value.utilisateurId },
    modele: { id: this.form.value.modeleId }
  };

  let request$;

  if (this.isEditMode && this.document && this.document.id) {
    // Mode modification sécurisé
    request$ = this.http.put(`http://localhost:8080/api/documents/${this.document.id}`, payload);
  } else {
    // Mode création
    request$ = this.http.post('http://localhost:8080/api/documents', payload);
  }

  request$.subscribe({
    next: () => {
      this.isEditMode = false;
      this.document = null;
      this.loadDocuments();
      this.form.reset();
    },
    error: (err) => {
      console.error('Erreur lors de la soumission :', err);
      alert("Une erreur est survenue lors de la soumission du formulaire.");
    }
  });
}
}
