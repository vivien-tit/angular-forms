import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentRequest {
  id: number;
  titre: string;
  type: 'Facture' | 'Contrat' | 'Lettre' | 'Devis' | 'Autre';
  contenu_json: any;
  date_creation: string;
  derniere_modif: string;
  utilisateur_id: number;
  modele_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  
  private apiUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  creerDocument(document: any) {
    return this.http.post(`${this.apiUrl}`, document);
  }

  getDocumentsByUtilisateur(id: number) {
    return this.http.get(`${this.apiUrl}/utilisateur/${id}`);
  }

  genererDocument(data: DocumentRequest): Observable<Blob> {
    return this.http.post(`${this.apiUrl}`, data, {
      responseType: 'blob'
    });
  }

  getByUtilisateur(utilisateurId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

   getAllByUser(utilisateurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  create(document: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, document);
  }

  update(id: number, document: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, document);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
