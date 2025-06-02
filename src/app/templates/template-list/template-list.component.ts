import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConventionFormComponent } from '../convention-form/convention-form.component';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-template-list',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
export class TemplateListComponent {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  openTemplateForm(): void {
    const dialogRef = this.dialog.open(ConventionFormComponent, {
      width: '800px',
      height: '90vh',         // <--- limite la hauteur du dialog
      panelClass: 'scrollable-dialog',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.snackBar.open('Formulaire soumis avec succès !', 'Fermer', {
          duration: 3000
        });
      }
    });
  }
}

