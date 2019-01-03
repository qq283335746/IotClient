import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOrderPage } from './find-order.page';

describe('FindOrderPage', () => {
  let component: FindOrderPage;
  let fixture: ComponentFixture<FindOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
