/**
 * Chatter - Chat themes Ionic 4 (https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatManaPage } from './chat-mana.page';

describe('ChatManaPage', () => {
  let component: ChatManaPage;
  let fixture: ComponentFixture<ChatManaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatManaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatManaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
