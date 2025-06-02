import { Component } from '@angular/core';
import { ModelesListComponent } from '../modeles-list/modeles-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DocumentDialogComponent } from '../../formulaires/document-dialog/document-dialog.component';
import { ConventionFormComponent } from '../../templates/convention-form/convention-form.component';

@Component({
  selector: 'app-documents-create',
  imports: [
    MatIconModule
  ],
  templateUrl: './documents-create.component.html',
  styleUrl: './documents-create.component.css'
})
export class DocumentsCreateComponent {
constructor(private dialog: MatDialog) {}

  ouvrirFormulaire(type: string) {
    this.dialog.open(ConventionFormComponent, {
      width: '600px',
      data: { type }
    });
  }
}
