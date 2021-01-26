import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistCounselingHistoryComponent } from './pharmacist-counseling-history.component';

describe('PharmacistCounselingHistoryComponent', () => {
  let component: PharmacistCounselingHistoryComponent;
  let fixture: ComponentFixture<PharmacistCounselingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistCounselingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistCounselingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
