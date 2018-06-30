import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineUpComponent } from './lineup.component';

describe('LineUpComponent', () => {
  let component: LineUpComponent;
  let fixture: ComponentFixture<LineUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
