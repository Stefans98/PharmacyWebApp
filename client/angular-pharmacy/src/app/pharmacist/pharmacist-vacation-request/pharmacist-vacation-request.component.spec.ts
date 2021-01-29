import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistVacationRequestComponent } from './pharmacist-vacation-request.component';

describe('PharmacistVacationRequestComponent', () => {
  let component: PharmacistVacationRequestComponent;
  let fixture: ComponentFixture<PharmacistVacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistVacationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
