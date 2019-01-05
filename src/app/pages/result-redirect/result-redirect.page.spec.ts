import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRedirectPage } from './result-redirect.page';

describe('ResultRedirectPage', () => {
  let component: ResultRedirectPage;
  let fixture: ComponentFixture<ResultRedirectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultRedirectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultRedirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
