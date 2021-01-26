import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistVacationRequestComponent } from './dermatologist-vacation-request.component';

describe('DermatologistVacationRequestComponent', () => {
  let component: DermatologistVacationRequestComponent;
  let fixture: ComponentFixture<DermatologistVacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistVacationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
