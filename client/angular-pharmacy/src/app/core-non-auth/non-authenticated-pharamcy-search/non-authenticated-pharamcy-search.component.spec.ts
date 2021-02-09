import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedPharamcySearchComponent } from './non-authenticated-pharamcy-search.component';

describe('NonAuthenticatedPharamcySearchComponent', () => {
  let component: NonAuthenticatedPharamcySearchComponent;
  let fixture: ComponentFixture<NonAuthenticatedPharamcySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedPharamcySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedPharamcySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
