import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utilisateurConnecte: any = null;

  private apiUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('utilisateur');
    if (user) {
      this.utilisateurConnecte = JSON.parse(user);
    }
  }

  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, motDePasse }).pipe(
      tap((utilisateur) => {
        this.utilisateurConnecte = utilisateur;
        localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
      })
    );
  }

  register(nom: string, email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nom, email, motDePasse });
  } 

  logout() {
    this.utilisateurConnecte = null;
    localStorage.removeItem('utilisateur');
  } 

  getUtilisateur(): any {
    return this.utilisateurConnecte;
  }

  getUtilisateurId(): number | null {
    return this.utilisateurConnecte ? this.utilisateurConnecte.id : null;
  }

  estConnecte(): boolean {
    return this.utilisateurConnecte !== null;
  }

}

