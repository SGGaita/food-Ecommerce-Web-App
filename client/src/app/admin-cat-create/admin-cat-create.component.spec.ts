import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatCreateComponent } from './admin-cat-create.component';

describe('AdminCatCreateComponent', () => {
  let component: AdminCatCreateComponent;
  let fixture: ComponentFixture<AdminCatCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCatCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
