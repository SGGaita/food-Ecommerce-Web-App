import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductCreateComponent } from './admin-product-create.component';

describe('AdminProductCreateComponent', () => {
  let component: AdminProductCreateComponent;
  let fixture: ComponentFixture<AdminProductCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
