import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-header',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    BrowserModule,

    FormsModule,
    CommonModule 
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() showSearchBar: boolean = true;
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSearch(): void {
    // Implémentez la logique de recherche ici
    console.log('Recherche:', this.searchQuery);
    this.router.navigate(['/recherche'], { queryParams: { q: this.searchQuery } });
  }

  openProfile(): void {
    this.router.navigate(['/profil']);
  }

  openSettings(): void {
    this.router.navigate(['/parametres']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}