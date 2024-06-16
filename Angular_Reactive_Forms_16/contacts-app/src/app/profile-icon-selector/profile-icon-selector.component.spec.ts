import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIconSelectorComponent } from './profile-icon-selector.component';

describe('ProfileIconSelectorComponent', () => {
  let component: ProfileIconSelectorComponent;
  let fixture: ComponentFixture<ProfileIconSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileIconSelectorComponent]
    });
    fixture = TestBed.createComponent(ProfileIconSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
