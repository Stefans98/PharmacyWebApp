import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistProfileComponent } from './dermatologist-profile.component';

describe('DermatologistProfileComponent', () => {
  let component: DermatologistProfileComponent;
  let fixture: ComponentFixture<DermatologistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
