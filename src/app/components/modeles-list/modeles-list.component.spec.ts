import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelesListComponent } from './modeles-list.component';

describe('ModelesListComponent', () => {
  let component: ModelesListComponent;
  let fixture: ComponentFixture<ModelesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
