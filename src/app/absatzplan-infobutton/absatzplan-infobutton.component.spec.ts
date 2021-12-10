import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsatzplanInfobuttonComponent } from './absatzplan-infobutton.component';

describe('AbsatzplanInfobuttonComponent', () => {
  let component: AbsatzplanInfobuttonComponent;
  let fixture: ComponentFixture<AbsatzplanInfobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsatzplanInfobuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsatzplanInfobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
