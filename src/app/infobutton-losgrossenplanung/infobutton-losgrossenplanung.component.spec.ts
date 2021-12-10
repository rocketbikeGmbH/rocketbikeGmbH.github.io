import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobuttonLosgrossenplanungComponent } from './infobutton-losgrossenplanung.component';

describe('InfobuttonLosgrossenplanungComponent', () => {
  let component: InfobuttonLosgrossenplanungComponent;
  let fixture: ComponentFixture<InfobuttonLosgrossenplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfobuttonLosgrossenplanungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfobuttonLosgrossenplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
