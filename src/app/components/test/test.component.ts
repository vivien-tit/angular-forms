import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  testForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
  });

  constructor(private router: Router) {}

  personnes: any[] = [];

  onSubmit() {
    if (this.testForm.valid) {
      this.http.post('http://localhost:8080/api/personnes', this.testForm.value)
        .subscribe(() => {
          this.getPersonnes();
          this.testForm.reset();
        });
    }
  }

  getPersonnes() {
    this.http.get<any[]>('http://localhost:8080/api/personnes')
      .subscribe(data => this.personnes = data);
  }

  ngOnInit() {
    this.getPersonnes();
  }
}
