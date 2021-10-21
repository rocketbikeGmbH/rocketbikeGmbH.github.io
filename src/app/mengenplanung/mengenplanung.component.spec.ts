import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MengenplanungComponent } from './mengenplanung.component';

describe('MengenplanungComponent', () => {
  let component: MengenplanungComponent;
  let fixture: ComponentFixture<MengenplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MengenplanungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MengenplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
