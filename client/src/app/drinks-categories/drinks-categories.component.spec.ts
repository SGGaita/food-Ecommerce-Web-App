import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksCategoriesComponent } from './drinks-categories.component';

describe('DrinksCategoriesComponent', () => {
  let component: DrinksCategoriesComponent;
  let fixture: ComponentFixture<DrinksCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
