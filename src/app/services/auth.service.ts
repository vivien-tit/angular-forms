import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersPath = 'assets/data/users.json';
  private currentUser: User | null = null;

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  // register(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }

  // Charger tous les utilisateurs
  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersPath);
  }

  // Sauvegarder les utilisateurs
  private saveUsers(users: User[]): Observable<void> {
    return this.http.put<void>(this.usersPath, users);
  }

  // Inscription
  register(user: Omit<User, 'id' | 'createdAt'>): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        if (users.some(u => u.email === user['email'])) {
          throw new Error('Email déjà utilisé');
        }

        const newUser: User = {
          ...user,
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          createdAt: new Date()
        };

        return [...users, newUser];
      }),
      map(updatedUsers => {
        this.saveUsers(updatedUsers).subscribe();
        return true;
      }),
      catchError(error => throwError(error))
    );
  }

  // Connexion
  login(email: string, password: string): Observable<User> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Email ou mot de passe incorrect');
        this.currentUser = user;
        return user;
      })
    );
  }

  // Déconnexion
  logout(): void {
    this.currentUser = null;
  }

  // Vérifier si connecté
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  // Getter utilisateur courant
  getCurrentUser(): User | null {
    return this.currentUser;
  }

}
