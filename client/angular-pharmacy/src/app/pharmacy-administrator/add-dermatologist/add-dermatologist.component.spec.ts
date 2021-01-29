import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDermatologistComponent } from './add-dermatologist.component';

describe('AddDermatologistComponent', () => {
  let component: AddDermatologistComponent;
  let fixture: ComponentFixture<AddDermatologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDermatologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDermatologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
