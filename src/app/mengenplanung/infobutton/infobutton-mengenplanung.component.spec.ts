import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobuttonProgrammplanungComponent } from './infobutton-mengenplanung.component';

describe('InfobuttonProgrammplanungComponent', () => {
  let component: InfobuttonProgrammplanungComponent;
  let fixture: ComponentFixture<InfobuttonProgrammplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfobuttonProgrammplanungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfobuttonProgrammplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
