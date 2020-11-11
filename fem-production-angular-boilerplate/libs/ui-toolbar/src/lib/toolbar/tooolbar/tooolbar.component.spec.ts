import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooolbarComponent } from './tooolbar.component';

describe('TooolbarComponent', () => {
  let component: TooolbarComponent;
  let fixture: ComponentFixture<TooolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
