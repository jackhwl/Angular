import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('Hello Users');
  });

  it('should render the correct title', () => {
    const h1 = debug.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('Hello Users');
    component.title = 'HEY THERE';
    fixture.detectChanges();
    expect(h1.nativeElement.innerText).toBe('HEY THERE');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
