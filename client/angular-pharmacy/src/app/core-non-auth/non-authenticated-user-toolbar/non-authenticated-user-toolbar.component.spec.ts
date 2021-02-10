import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedUserToolbarComponent } from './non-authenticated-user-toolbar.component';

describe('NonAuthenticatedUserToolbarComponent', () => {
  let component: NonAuthenticatedUserToolbarComponent;
  let fixture: ComponentFixture<NonAuthenticatedUserToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedUserToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedUserToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
