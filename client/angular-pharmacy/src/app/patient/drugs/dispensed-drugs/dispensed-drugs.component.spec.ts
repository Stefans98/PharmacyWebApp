import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensedDrugsComponent } from './dispensed-drugs.component';

describe('DispensedDrugsComponent', () => {
  let component: DispensedDrugsComponent;
  let fixture: ComponentFixture<DispensedDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensedDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensedDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
