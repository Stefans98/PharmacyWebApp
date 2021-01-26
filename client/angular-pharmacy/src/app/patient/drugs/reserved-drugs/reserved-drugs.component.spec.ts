import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedDrugsComponent } from './reserved-drugs.component';

describe('ReservedDrugsComponent', () => {
  let component: ReservedDrugsComponent;
  let fixture: ComponentFixture<ReservedDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
