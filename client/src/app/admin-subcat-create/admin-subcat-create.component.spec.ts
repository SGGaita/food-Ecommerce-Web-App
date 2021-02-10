import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcatCreateComponent } from './admin-subcat-create.component';

describe('AdminSubcatCreateComponent', () => {
  let component: AdminSubcatCreateComponent;
  let fixture: ComponentFixture<AdminSubcatCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcatCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
