import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestPharmacistsComponent } from './vacation-request-pharmacists.component';

describe('VacationRequestPharmacistsComponent', () => {
  let component: VacationRequestPharmacistsComponent;
  let fixture: ComponentFixture<VacationRequestPharmacistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationRequestPharmacistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestPharmacistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
