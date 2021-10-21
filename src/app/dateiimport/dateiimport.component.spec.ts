import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateiimportComponent } from './dateiimport.component';

describe('DateiimportComponent', () => {
  let component: DateiimportComponent;
  let fixture: ComponentFixture<DateiimportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateiimportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateiimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
