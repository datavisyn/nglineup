import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NglineupComponent } from './nglineup.component';

describe('NglineupComponent', () => {
  let component: NglineupComponent;
  let fixture: ComponentFixture<NglineupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NglineupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NglineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
