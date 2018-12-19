import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackagePage } from './order-package.page';

describe('OrderPackagePage', () => {
  let component: OrderPackagePage;
  let fixture: ComponentFixture<OrderPackagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPackagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
