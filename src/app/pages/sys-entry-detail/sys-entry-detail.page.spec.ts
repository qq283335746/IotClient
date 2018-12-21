import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysEntryDetailPage } from './sys-entry-detail.page';

describe('SysEntryDetailPage', () => {
  let component: SysEntryDetailPage;
  let fixture: ComponentFixture<SysEntryDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysEntryDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysEntryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
