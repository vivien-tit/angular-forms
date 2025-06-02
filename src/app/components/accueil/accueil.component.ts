import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { TemplateListComponent } from '../../templates/template-list/template-list.component';

@Component({
  selector: 'app-accueil',
  imports: [
    SearchBarComponent,
    TemplateListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  count: number = 0;
    search = '';
  
    constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('URL actuelle:', event.url);
      }
    });
    }
  
    increaseCount() {
      this.count++;
    }
  onSearch(): void {}
}
