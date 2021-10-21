import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammplanungComponent } from './programmplanung.component';

describe('ProgrammplanungComponent', () => {
  let component: ProgrammplanungComponent;
  let fixture: ComponentFixture<ProgrammplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammplanungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
