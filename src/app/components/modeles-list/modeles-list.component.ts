import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContraFormComponent } from '../../formulaires/contra-form/contra-form.component';
import { Modele, ModeleService } from '../../services/modele.service';
import { CommonModule } from '@angular/common';
import { ConventionFormComponent } from '../../templates/convention-form/convention-form.component';

@Component({
  selector: 'app-modeles-list',
  imports: [
    CommonModule
  ],
  templateUrl: './modeles-list.component.html',
  styleUrls: ['./modeles-list.component.css']
})
export class ModelesListComponent implements OnInit {
  modeles: Modele[] = [];

  constructor(
    private modeleService: ModeleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.modeleService.getModeles().subscribe(data => {
      this.modeles = data;
    });
  }

  ouvrirFormulaire(modele: Modele): void {
    this.dialog.open(ConventionFormComponent, {
      width: '800px',
      height: '90vh',         // <--- limite la hauteur du dialog
      panelClass: 'scrollable-dialog',
      data: { modele }
    });
  }
}
