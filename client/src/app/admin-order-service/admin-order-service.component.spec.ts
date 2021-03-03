import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderServiceComponent } from './admin-order-service.component';

describe('AdminOrderServiceComponent', () => {
  let component: AdminOrderServiceComponent;
  let fixture: ComponentFixture<AdminOrderServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
