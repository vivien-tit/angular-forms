import { CommonModule } from '@angular/common';
import { AuthService } from '../../components/login/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule,CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
 
});
  errorMessage: string = '';
  invalidCredentials: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(
      this.loginFormGroup.value.username ?? '',
      this.loginFormGroup.value.password ?? ''
    ).subscribe({
      next: () => {
        // Redirection après une connexion réussie
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects';
      }
    });
  }
}