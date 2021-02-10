import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcatListComponent } from './admin-subcat-list.component';

describe('AdminSubcatListComponent', () => {
  let component: AdminSubcatListComponent;
  let fixture: ComponentFixture<AdminSubcatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
