import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavcComponent } from './topnavc.component';

describe('TopnavcComponent', () => {
  let component: TopnavcComponent;
  let fixture: ComponentFixture<TopnavcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
