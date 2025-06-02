import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Modele {
  id: number;
  nom: string;
  categorie: 'Professionnel' | 'Personnel';
  fichierTemplate: string;
  apercuImg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  private apiUrl = 'http://localhost:8080/api/modeles';

  constructor(private http: HttpClient) {}

  getModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.apiUrl);
  }
}
