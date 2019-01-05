import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBackPage } from './order-back.page';

describe('OrderBackPage', () => {
  let component: OrderBackPage;
  let fixture: ComponentFixture<OrderBackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
