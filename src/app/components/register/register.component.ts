import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../components/login/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  errorMessage = '';
  registerFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['user', Validators.required]
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const { username, password, role } = this.registerFormGroup.value;
    this.authService.register(
      username ?? '',
      password ?? '',
      role ?? 'user'
    ).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de l\'inscription';
      }
    });
  }
}
