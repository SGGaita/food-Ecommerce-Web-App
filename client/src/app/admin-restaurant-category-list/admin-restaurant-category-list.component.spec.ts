import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantCategoryListComponent } from './admin-restaurant-category-list.component';

describe('AdminRestaurantCategoryListComponent', () => {
  let component: AdminRestaurantCategoryListComponent;
  let fixture: ComponentFixture<AdminRestaurantCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestaurantCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestaurantCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
