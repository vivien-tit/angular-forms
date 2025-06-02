import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private readonly USERS_URL = 'assets/data/users.json';
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.get<any[]>(this.USERS_URL).pipe(
      tap(users => {
        const user = users.find(u => 
          u.username === username && u.password === password
        );
        if (user) {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user)); // Stockage session
          this.router.navigate(['/home']);
        } else {
          throw new Error('Identifiants incorrects');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser || !!localStorage.getItem('currentUser');
  }

  getUserRole(): string {
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role;
  }

  register(username: string, password: string, role: string) {
    return this.http.get<any[]>(this.USERS_URL).pipe(
        tap(users => {
        const exists = users.some(u => u.username === username);
        if (exists) {
            throw new Error('Nom d\'utilisateur déjà utilisé');
        }

        // Simule une écriture : à remplacer par une vraie API plus tard
        const newUser = { id: users.length + 1, username, password, role };
        const updatedUsers = [...users, newUser];

        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        console.log('Utilisateur enregistré (fictivement) :', newUser);
        })
    );
    }

}