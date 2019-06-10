import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubservicesPage } from './subservices.page';

describe('SubservicesPage', () => {
  let component: SubservicesPage;
  let fixture: ComponentFixture<SubservicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubservicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubservicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
