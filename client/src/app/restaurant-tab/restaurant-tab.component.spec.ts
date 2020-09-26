import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTabComponent } from './restaurant-tab.component';

describe('RestaurantTabComponent', () => {
  let component: RestaurantTabComponent;
  let fixture: ComponentFixture<RestaurantTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
