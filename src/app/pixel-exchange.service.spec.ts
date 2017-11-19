import { TestBed, inject } from '@angular/core/testing';

import { PixelExchangeService } from './pixel-exchange.service';

describe('PixelExchangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PixelExchangeService]
    });
  });

  it('should be created', inject([PixelExchangeService], (service: PixelExchangeService) => {
    expect(service).toBeTruthy();
  }));
});
