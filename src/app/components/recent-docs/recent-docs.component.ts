import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Document } from '../models/document.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-recent-docs',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './recent-docs.component.html',
  styleUrls: ['./recent-docs.component.css']
})
export class RecentDocsComponent {
  @Input() documents: Document[] = [];
  @Output() onRefresh = new EventEmitter<void>();
  @Output() onAction = new EventEmitter<{action: string, doc: Document}>();

  constructor(private snackBar: MatSnackBar) {}

  getPreview(content: any): string {
    if (typeof content === 'string') {
      return content.length > 100 ? content.substring(0, 100) + '...' : content;
    }
    return JSON.stringify(content).substring(0, 100) + '...';
  }

  openDocument(doc: Document): void {
    this.onAction.emit({action: 'open', doc});
  }

  regenerate(event: Event, docId: string): void {
    event.stopPropagation();
    this.onAction.emit({action: 'regenerate', doc: {id: docId} as Document});
  }

  download(event: Event, doc: Document): void {
    event.stopPropagation();
    this.onAction.emit({action: 'download', doc});
    this.snackBar.open(`Téléchargement de ${doc.titre}`, 'Fermer', {duration: 2000});
  }

  share(event: Event, doc: Document): void {
    event.stopPropagation();
    this.onAction.emit({action: 'share', doc});
  }

  refresh(): void {
    this.onRefresh.emit();
  }
}
