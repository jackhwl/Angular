/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MikeComponent } from './mike.component';

describe('MikeComponent', () => {
  let component: MikeComponent;
  let fixture: ComponentFixture<MikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MikeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
