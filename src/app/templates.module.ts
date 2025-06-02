// templates.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConventionFormComponent } from './templates/convention-form/convention-form.component';
import { TemplateListComponent } from './templates/template-list/template-list.component';

// Ensure the paths are correct and the components exist at these locations.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TestComponent } from './templates/test/test.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TemplateListComponent,
    ConventionFormComponent,
    TestComponent
  ],
  exports: [

  ]
})
export class TemplatesModule { }