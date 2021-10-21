import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsatzplanungComponent } from './absatzplanung.component';

describe('AbsatzplanungComponent', () => {
  let component: AbsatzplanungComponent;
  let fixture: ComponentFixture<AbsatzplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsatzplanungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsatzplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
