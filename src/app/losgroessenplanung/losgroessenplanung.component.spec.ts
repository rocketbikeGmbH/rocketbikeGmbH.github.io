import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosgroessenplanungComponent } from './losgroessenplanung.component';

describe('LosgroessenplanungComponent', () => {
  let component: LosgroessenplanungComponent;
  let fixture: ComponentFixture<LosgroessenplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosgroessenplanungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LosgroessenplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
