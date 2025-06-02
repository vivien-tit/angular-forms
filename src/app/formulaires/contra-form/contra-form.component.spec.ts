import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraFormComponent } from './contra-form.component';

describe('ContraFormComponent', () => {
  let component: ContraFormComponent;
  let fixture: ComponentFixture<ContraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContraFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
