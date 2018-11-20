import { TestBed } from '@angular/core/testing';

import { MessageSenderService } from './message-sender.service';

describe('MessageSenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageSenderService = TestBed.get(MessageSenderService);
    expect(service).toBeTruthy();
  });
});
