import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEditComponent } from './details-edit.component';

describe('DetailsEditComponent', () => {
  let component: DetailsEditComponent;
  let fixture: ComponentFixture<DetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
