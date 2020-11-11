import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDetailsComponent } from './widgets-details.component';

describe('WidgetsDetailsComponent', () => {
  let component: WidgetsDetailsComponent;
  let fixture: ComponentFixture<WidgetsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
