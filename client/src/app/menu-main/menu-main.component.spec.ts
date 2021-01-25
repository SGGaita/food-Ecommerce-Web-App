import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMainComponent } from './menu-main.component';

describe('MenuMainComponent', () => {
  let component: MenuMainComponent;
  let fixture: ComponentFixture<MenuMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
