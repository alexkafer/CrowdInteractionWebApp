import { TestBed, inject } from '@angular/core/testing';

import { PixelManagerService } from './pixel-manager.service';

describe('PixelManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PixelManagerService]
    });
  });

  it('should be created', inject([PixelManagerService], (service: PixelManagerService) => {
    expect(service).toBeTruthy();
  }));
});
