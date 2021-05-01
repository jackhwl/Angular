import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeterComponent } from './peter.component';

describe('PeterComponent', () => {
  let component: PeterComponent;
  let fixture: ComponentFixture<PeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
