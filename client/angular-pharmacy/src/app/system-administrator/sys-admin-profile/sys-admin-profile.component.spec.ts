import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdminProfileComponent } from './sys-admin-profile.component';

describe('SysAdminProfileComponent', () => {
  let component: SysAdminProfileComponent;
  let fixture: ComponentFixture<SysAdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysAdminProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
