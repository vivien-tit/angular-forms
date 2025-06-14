import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique-list',
  imports: [
    CommonModule
  ],
  templateUrl: './historique-list.component.html',
  styleUrl: './historique-list.component.css'
})
export class HistoriqueListComponent implements OnInit {
  historiqueList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHistorique();
    console.log('document recu', this.historiqueList);
  }

  loadHistorique(): void {
    this.http.get<any[]>('http://localhost:8080/api/historiques')
      .subscribe(data => this.historiqueList = data);
  }    

}
