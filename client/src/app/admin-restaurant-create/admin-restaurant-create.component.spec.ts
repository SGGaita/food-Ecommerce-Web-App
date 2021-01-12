import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantCreateComponent } from './admin-restaurant-create.component';

describe('AdminOrderCreateComponent', () => {
  let component: AdminRestaurantCreateComponent;
  let fixture: ComponentFixture<AdminRestaurantCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestaurantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestaurantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
