import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateiexportComponent } from './dateiexport.component';

describe('DateiexportComponent', () => {
  let component: DateiexportComponent;
  let fixture: ComponentFixture<DateiexportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateiexportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateiexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
