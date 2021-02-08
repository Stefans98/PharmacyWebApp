import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyGraphComponent } from './penalty-graph.component';

describe('PenaltyGraphComponent', () => {
  let component: PenaltyGraphComponent;
  let fixture: ComponentFixture<PenaltyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
