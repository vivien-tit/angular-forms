import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../components/models/document.model'; // Assurez-vous que le chemin est correct

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private apiUrl = 'http://localhost:3000/api'; // Modifiez l'URL selon votre backend

    constructor(private http: HttpClient) {}

    getRecentDocuments(): Observable<Document[]> {
        return this.http.get<Document[]>(`${this.apiUrl}/documents/recent`);
    }

    // Exemple de méthode pour créer un document
    createDocument(document: Document): Observable<Document> {
        return this.http.post<Document>(`${this.apiUrl}/documents`, document);
    }

    // Exemple de méthode pour récupérer un document par ID
    getDocumentById(id: string): Observable<Document> {
        return this.http.get<Document>(`${this.apiUrl}/documents/${id}`);
    }

    // Exemple de méthode pour mettre à jour un document
    updateDocument(id: string, document: Partial<Document>): Observable<Document> {
        return this.http.put<Document>(`${this.apiUrl}/documents/${id}`, document);
    }

    // Exemple de méthode pour supprimer un document
    deleteDocument(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/documents/${id}`);
    }
    
}