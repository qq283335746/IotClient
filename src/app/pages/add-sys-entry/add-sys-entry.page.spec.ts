import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSysEntryPage } from './add-sys-entry.page';

describe('AddSysEntryPage', () => {
  let component: AddSysEntryPage;
  let fixture: ComponentFixture<AddSysEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSysEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSysEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
